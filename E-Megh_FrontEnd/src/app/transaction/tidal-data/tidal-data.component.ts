import { Component, OnInit, ViewChild, Inject, ElementRef } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { cls_TidalData, DEFAULT_COLUMNS, DEFAULT_TABLE_COLUMNS } from "@source/app/_models";
import { DialogService, GlobalService, MasterService } from "@source/app/_services";
import { Cls_TableColumns } from "@source/app/_shared/dynamic-table/dynamic-table.component";
import { TidalDataDialogComponent } from "./tidal-data-dialog/tidal-data-dialog.component";
import { UnSubscriber } from "@source/app/_shared/UnSubscriber";
import * as XLSX from "xlsx";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import * as ExcelJS from "exceljs";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-tidal-data",
  templateUrl: "./tidal-data.component.html",
  styleUrls: ["./tidal-data.component.scss"],
})
export class TidalDataComponent extends UnSubscriber implements OnInit {
  constructor(public _GlobalService: GlobalService, private dialog: MatDialog, private _MasterService: MasterService, private datepipe: DatePipe, private toastr: ToastrService, private dialogService: DialogService) {
    super();
  }

  ngOnInit() {
    ({ DEFAULT_COLUMNS: this.displayedColumns, DEFAULT_TABLE_COLUMNS: this.defaultTableColumns } = this._GlobalService.tableColumnReformater(DEFAULT_COLUMNS.TIDAL, DEFAULT_TABLE_COLUMNS.TIDAL));
    this.GetReadingLocationData();
    this.GetTidalData();
  }

  // #region Variable
  totalColumns: Cls_TableColumns[] = [];
  defaultTableColumns: Cls_TableColumns[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  ReadingLocationList: any[] = [];
  ReadingLocationID: number = 1;
  excelData: any[] = [];
  IsEdit: boolean = false;
  ViewData: any;
  TypeID: number = 0;
  TidalDataID?: number;
  LocationList: any[] = [];
  TType: number = 1;
  TypeList = [
    { id: 1, Name: "High" },
    { id: 2, Name: "Low" },
  ];
  TDate: string = this.datepipe.transform(new Date(), "yyyy-MM-dd")!;
  currentdate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  TTime: string = this.datepipe.transform(new Date(), "hh:mm")!;
  Height?: number;

  tidaldataSource: any[] = [];
  tidaldisplayedColumns: string[] = [];

  exceldataSource = new MatTableDataSource<any>();
  exceldisplayedColumns: string[] = ["date", "time", "height", "tideType"];
  @ViewChild(MatPaginator) Excelpaginator!: MatPaginator;
  @ViewChild(MatSort) Excelsort!: MatSort; // Define your column names here
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild("fileInput") fileInputRef!: ElementRef;

  ngAfterViewInit() {
    this.exceldataSource.paginator = this.paginator;
    this.exceldataSource.sort = this.sort;
  }

  // #endregion

  GetTidalData() {
    this.dataSource.data = [];
    this.anotherSubscription = this._MasterService.GetTidalData_Report(this.ReadingLocationID, 0).subscribe((res: any) => {
      const { Table } = res;
      this.dataSource.data = Table;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  GetReadingLocationData() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      this.ReadingLocationList = JSON.parse(JSON.stringify(res["Table"]));
      this._GlobalService.dynamicInputSelect(this.ReadingLocationList, "RLID", item => `${item.Name}`);
    });
    this.GetTidalData();
  }

  openDialog(id?: number) {
    const dialogConfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogConfig);
    dialogConfig.width = "20%";
    dialogConfig.data = {
      IsEdit: id ? true : false,
      ID: id,
      ReadingLocationID: this.ReadingLocationID,
    };
    const dialogRef = this.dialog.open(TidalDataDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.GetTidalData();
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0]; // array of selected file select kariye tyare ane target kare and ama je first hoy ane access kare because of [0]
    const fileReader = new FileReader(); //A FileReader object is used to read the contents of the selected file.

    fileReader.readAsArrayBuffer(file); //filereader che ae file ne array buffer na rite read kare je binary representation che file na data nu

    fileReader.onload = (e: any) => {
      //jyare file successfully load thay tyare onload event trigger thay
      const arrayBuffer = e.target.result; //jyare file load thay tyare apne filereader pase thi ek array buffer male tene pachi apne ek function ma pass kariye
      this.parseExcel(arrayBuffer);
    };
  }

  async parseExcel(arrayBuffer: any): Promise<void> {
    const workbook = new ExcelJS.Workbook(); // create instance for work with excel file
    let FmData = new cls_TidalData();
    let rowCountProcessed = 0; // To count rows successfully processed

    try {
      await workbook.xlsx.load(arrayBuffer); //arraybuffer ma je file hoy tene load karva mate aa method no use thay xlsx.load
      let worksheet = workbook.getWorksheet(1); // Assuming the first sheet is the relevant one tene process karva mate

      if (worksheet) {
        let rowCount = worksheet.rowCount;
        
        for (let row = 3; row <= rowCount; row++) {
          try {
            let cellValue = worksheet.getCell(row, 1).value;
            if (!cellValue) {
              console.warn(`Skipping row ${row}: Missing day value.`);
              continue;
            }

            let day = parseInt(cellValue.toString()); //excel na cell ma je value che tene pehla string ma convert kare and string ma hoy to convert ni kare after string ne int ma convert kare
            let month = worksheet.getCell(2, 1).value?.toString().substring(0, 3) ?? ""; //excel ma row number 2 and column number 1 ni value ne string ma convert kare and string ma convert kareli value ne extract kare substring method thi

            // Get the current year dynamically
            let currentYear = new Date().getFullYear();

            // Construct the date dynamically with the current year
            let parsedDate = new Date(Date.parse(`${month} 1, ${currentYear}`));
            let newDate = new Date(parsedDate.setDate(day));
            let formattedDate = this.datepipe.transform(newDate, "yyyy-MM-dd")!;

            let timeCellValue = worksheet.getCell(row, 2).value?.toString()?.trim();
            if (!timeCellValue) {
              console.warn(`Skipping row ${row}: Missing time value.`);
              continue;
            }

            let time = worksheet.getCell(row, 2).value?.toString() ?? "";
            let height = parseFloat(worksheet.getCell(row, 3).value?.toString() ?? "0");
            let tideType = parseInt(worksheet.getCell(row, 4).value?.toString() ?? "0");
            let createdBy = sessionStorage.getItem("UID") || "";
            let readingLocation = this.ReadingLocationID;

            let hours = time.substring(0, 2); // "03"
            let minutes = time.substring(2);
            let formattedTime = `${hours}:${minutes}`;

            // Set FmData properties
            FmData.ReadingLocationID = readingLocation;
            FmData.TDate = formattedDate;
            FmData.TType = tideType;
            FmData.TTime = this._GlobalService.convertToTime(formattedTime);
            FmData.Height = height;
            FmData.CreatedBy = parseInt(createdBy);

            // Process FmData
            await this._MasterService.AddTidalData(FmData).toPromise();
            rowCountProcessed++;
            console.log(`Successfully processed row ${row}`);
          } catch (error) {
            console.error(`Error processing row ${row}:`, error);
          }
        }

        console.log(`Total rows processed: ${rowCountProcessed}`);
        console.log(`Total rows in Excel: ${rowCount - 2}`); // Adjust for header or metadata rows
        if (rowCountProcessed > 0) {
          this.toastr.success("File data uploaded successfully");
        } else {
          this.toastr.warning("No rows were processed.");
        }
      } else {
        console.error("Worksheet not found");
      }
    } catch (error) {
      console.error("Error loading workbook:", error);
    } finally {
      if (this.fileInputRef) {
        this.fileInputRef.nativeElement.value = "";
      }
    }
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workbook: XLSX.WorkBook = {
      Sheets: { "Prediction Data": worksheet },
      SheetNames: ["Prediction Data"],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    this.saveAsExcelFile(excelBuffer, "WaterLevelPrediction");
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(data, `${fileName}.xlsx`);
  }
}
