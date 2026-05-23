import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { UnSubscriber } from "../_shared/UnSubscriber";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MasterService, GlobalService } from "../_services";
import { ChartType } from "angular-google-charts";
import { MapDialogComponent } from "../_shared/map-dialog/map-dialog.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-graphdashboard",
  templateUrl: "./graphdashboard.component.html",
  styleUrls: ["./graphdashboard.component.scss"],
})
export class GraphdashboardComponent extends UnSubscriber implements OnInit, AfterViewInit {
  WeatherData: any;
  ReadingLocationID: number = 1;
  topRowNumber: number = 10;
  LocationList: any[] = [];
  SirenLocation: any[] = [];
  SensorStatus: any[] = [];
  IsFullScreen: boolean = false;
  totalRedAlert: number = 0;
  totalYellowAlert: number = 0;
  totalwhiteAlert: number = 0;
  redAlertVillages: string[] = [];
  yellowAlertVillages: string[] = [];
  whiteAlertVillages: string[] = [];
  @ViewChild("redBox") redBox!: ElementRef;
  @ViewChild("yellowBox") yellowBox!: ElementRef;
  autoScrollInterval: any;
  Days: number = 30;
  ToDate: Date = new Date();
  FromDate: Date = new Date();
  groupedSirenLocations: any[] = [];

  RefreshTimeList: any[] = [];
  SirenRefreshTimerHandler: any;
  ChartRefreshTimerHandler: any;
  CurrentReadingRefreshHandler: any;
  VillageMapData: any[] = [];
  TidalData: any[] = [];
  daysOptions = [
    { id: 0, name: "Live" },
    { id: 5, name: "5 Days" },
    { id: 7, name: "7 Days" },
    { id: 15, name: "15 Days" },
    { id: 30, name: "30 Days" },
  ];
  selectedIndex: number = 0;
  selectedDays: number = this.daysOptions[0].id;

  private sidebarToggleSubscription: Subscription | undefined;

  constructor(private _MasterService: MasterService, private _GlobalService: GlobalService, private dialog: MatDialog) {
    super();
  }

  chart = {
    title: "Reading Date & Times",
    type: ChartType.AreaChart,
    data: [] as (Date | number | string)[][], // Correct Type Definition

    columnNames: ["Reading Date & Time", "Water Level (feet)", { type: "string", role: "tooltip", p: { html: true } }, "Danger Level (feet)", { type: "string", role: "tooltip", p: { html: true } }, "Prediction Level (feet)", { type: "string", role: "tooltip", p: { html: true } }],
    options: this.ChartOptions(1, []),
  };

  private resizeTimeout: any;

  ngAfterViewInit() {
    // Initial chart resize
    this.refreshChart();
    // Add a small delay to ensure the chart container is properly rendered
    setTimeout(() => {
      this.refreshChart();
    }, 500);

    // Listen for window resize events
    window.addEventListener("resize", this.onResize.bind(this));

    // Listen for sidebar toggle events
    this.sidebarToggleSubscription = this._GlobalService.sidebarToggle$.subscribe(() => {
      // Add a small delay to allow the sidebar animation to complete
      setTimeout(() => {
        this.refreshChart();
      }, 300);
    });
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?: any) {
    // Debounce resize events
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.refreshChart();
    }, 200);
  }

  refreshChart() {
    if (this.chart?.data && this.chart.data.length > 0) {
      // Force chart redraw by updating options with current ticks
      const currentTicks = this.chart.options?.hAxis?.ticks || [];
      // Create a new options object to trigger change detection
      const options = this.ChartOptions(1, currentTicks);
      // Create chart area options with type assertion
      const chartAreaOptions: any = {
        ...options.chartArea,
        width: "90%",
        left: "5%",
        right: "5%",
      };

      // Update chart options with type assertion
      const chartOptions: any = {
        ...options,
        width: "100%",
        chartArea: chartAreaOptions,
      };

      // Update chart with new options
      this.chart = {
        ...this.chart,
        options: chartOptions,
      };
    }
    if (this.chart2?.data && this.chart2.data.length > 0) {
      // Force chart redraw by updating options with current ticks
      const currentTicks = this.chart2.options?.hAxis?.ticks || [];
      // Create a new options object to trigger change detection
      const options = this.ChartOptions(2, currentTicks);
      // Create chart area options with type assertion
      const chartAreaOptions: any = {
        ...options.chartArea,
        width: "90%",
        left: "5%",
        right: "5%",
      };

      // Update chart options with type assertion
      const chartOptions: any = {
        ...options,
        width: "100%",
        chartArea: chartAreaOptions,
      };

      // Update chart with new options
      this.chart2 = {
        ...this.chart2,
        options: chartOptions,
      };
    }
  }
  async ngOnInit() {
    this.GetReadingLocationData();
    this.GetDailyReadingData(this.ReadingLocationID, 241);
    // console.log(this.GetDailyReadingData(this.ReadingLocationID, 241))
    // setInterval(() => {
    //   this.GetSensorData();
    // }, 30000);
    this.GetSensorData();
    this.GetAffectedVillageLocation();

    this.getVillageData();
    // this._GlobalService.IsSidebarOpen.subscribe((isOpen) => {
    //   this.refreshChart();
    // });
    this._GlobalService.IsSidebarOpen.subscribe((isOpen) => {
      // console.log("Sidebar state changed:", isOpen);
      setTimeout(() => {
        this.refreshChart();
      }, 1000);
    });
    // this.GetWhetherData();
  }

  GetReadingLocationData() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      this.LocationList = Table;
      this._GlobalService.dynamicInputSelect(this.LocationList, "RLID", item => `${item.Name}`);
    });
  }

  onDaysChange() {
    // Reset to Live view when location changes
    this.selectedIndex = 0;
    this.selectedDays = this.daysOptions[0].id;

    // Refresh data
    this.GetDailyReadingData(this.ReadingLocationID, 241);
    this.GetAffectedVillageLocation();
    this.getVillageData();
    this.GetTidalData();
  }

  changeDays(step: number) {
    const newIndex = this.selectedIndex + step;
    if (newIndex >= 0 && newIndex < this.daysOptions.length) {
      this.selectedIndex = newIndex;
      this.selectedDays = this.daysOptions[newIndex].id;
      if (this.selectedDays === 0) {
        this.GetDailyReadingData(this.ReadingLocationID, 241);
        this.GetTidalData();
      } else {
        this._MasterService.GetTopRowNumber(this.ReadingLocationID, this.selectedDays).subscribe((res: any) => {
          this.GetDailyReadingData(this.ReadingLocationID, res.TopRowNumber);
        });
        if (this.ReadingLocationID === 1) {
          this._MasterService.GetTopRowNumberTidal(this.ReadingLocationID, this.selectedDays).subscribe((res: any) => {
            this.GetTidalData();
          });
        } else {
          this.GetTidalData();
        }
      }
    }
  }

  // GetDailyReadingData(ReadingLocationID: number, TopRowNumber: number) {
  //   this.chart.data = [];

  //   this._MasterService.GetDailyReadingData(ReadingLocationID, TopRowNumber).subscribe((res: any) => {
  //     const { Table } = res;
  //     console.log(res)

  //     const parseNumber = (value: any): number | null => (value !== null && value !== undefined && !isNaN(+value) ? +value : null);
  //     if (Table && Table.length > 0) {
  //       this.chart.data = Table.map((item: any) => {
  //         // date parsing...
  //         const dateTimeParts = item.EDateTime.split(" ");
  //         const dateParts = dateTimeParts[0].split("/");
  //         const timeParts = dateTimeParts[1].split(":");

  //         const date = new Date();
  //         date.setDate(+dateParts[0]);
  //         date.setMonth(+dateParts[1] - 1);
  //         date.setHours(+timeParts[0]);
  //         date.setMinutes(+timeParts[1]);
  //         date.setSeconds(0);

  //         const tooltipStyle = `
  //         color: white;
  //         font-size: 18px;
  //         padding: 8px 12px;
  //         border-radius: 5px;
  //         text-align: center;
  //         width: fit-content;
  //         margin: 5px auto;
  //         line-height: 1.6;
  //       `;

  //         const waterLevelTooltip = `
  //         <div style="background-color: #0077b6; ${tooltipStyle}">
  //           <div style="margin-bottom: 5px;">Actual Water Level:</div>
  //           <div><strong>${item.edatetimetooltip}</strong></div>
  //           <div style="font-weight: bold;">${item.waterlevel} ft</div>
  //         </div>
  //       `;

  //         const dangerLevelTooltip = `
  //         <div style="background-color: red; ${tooltipStyle}">
  //           <div style="margin-bottom: 5px;">Danger Water Level:</div>
  //           <div><strong>${item.edatetimetooltip}</strong></div>
  //           <div style="font-weight: bold;">${item.dangerwaterlevel} ft</div>
  //         </div>
  //       `;

  //       const predictionTooltip = `
  //       <div style="background-color:#ffa500; ${tooltipStyle}">
  //         <div style="margin-bottom: 5px;">Predicted Water Level:</div>
  //         <div><strong>${item.edatetimetooltip}</strong></div>
  //         <div style="font-weight: bold;">${item.predicatewaterlevel} ft</div>
  //       </div>
  //     `;
  //         if (isNaN(+item.waterlevel)) {
  //           // console.warn("Invalid WaterLevel:", item.waterlevel, item);
  //         }
  //         return [date, parseNumber(item.waterlevel), waterLevelTooltip, parseNumber(item.dangerwaterlevel), dangerLevelTooltip, parseNumber(item.predicatewaterlevel), predictionTooltip];

  //         // return [date, parseNumber(item.waterlevel), waterLevelTooltip, parseNumber(item.dangerwaterlevel), dangerLevelTooltip, parseNumber(item.predicatewaterlevel), predictionTooltip, parseNumber(item.HighPrediction), highPredictionTooltip, parseNumber(item.LowPrediction), lowPredictionTooltip];
  //       });

  //       this.updateXTicks();
  //     }
  //     // console.log("Chart Data:", this.chart.data);
  //   });
  // }

  async GetDailyReadingData(ReadingLocationID: number, TopRowNumber: number) {
    this.chart.data = [];

    await this._MasterService.GetDailyReadingData(ReadingLocationID, TopRowNumber).subscribe((res: any) => {
      const { Table } = res;

      this.ToDate = Table[0][0].mDateTime;  // first row, first element
      this.FromDate = Table[0][Table[0].length - 1].mDateTime;

      let nearestPrediction: { time: Date, waterLevel: number } | null = null;

      if (Table[0] && Table[0].length > 0) {
        const now = new Date();

        // ✅ Find row with nearest mDateTime to current time
        let closestRow = Table[0].reduce((prev: any, curr: any) => {
          const prevDiff = Math.abs(new Date(prev.mDateTime).getTime() - now.getTime());
          const currDiff = Math.abs(new Date(curr.mDateTime).getTime() - now.getTime());
          return (currDiff < prevDiff ? curr : prev);
        });

        nearestPrediction = {
          time: new Date(closestRow.mDateTime),
          waterLevel: +closestRow.predicatewaterlevel
        };

        // ✅ Allow all past data + next 6 hours only
        const sixHoursLater = new Date(nearestPrediction.time.getTime() + 6 * 60 * 60 * 1000);
        const filteredTable = Table[0].filter((item: any) => {
          const itemTime = new Date(item.mDateTime);
          return itemTime <= sixHoursLater;  // remove only beyond 6h
        });

        // ✅ Continue with chart mapping
        this.chart.data = filteredTable.map((item: any) => {
          const date = new Date(item.mDateTime);

          const parseNumber = (value: any): number | null =>
            (value !== null && value !== undefined && !isNaN(+value) ? +value : null);

          const tooltipStyle = `
            color: white;
            font-size: 18px;
            padding: 8px 12px;
            border-radius: 5px;
            text-align: center;
            width: fit-content;
            margin: 5px auto;
            line-height: 1.6;
          `;

          const waterLevelTooltip = `
            <div style="background-color: #0077b6; ${tooltipStyle}">
              <div style="margin-bottom: 5px;">Actual Water Level:</div>
              <div><strong>${item.edatetimetooltip}</strong></div>
              <div style="font-weight: bold;">${item.waterlevel} ft</div>
            </div>
          `;

          const dangerLevelTooltip = `
            <div style="background-color: red; ${tooltipStyle}">
              <div style="margin-bottom: 5px;">Danger Water Level:</div>
              <div><strong>${item.edatetimetooltip}</strong></div>
              <div style="font-weight: bold;">${item.dangerwaterlevel} ft</div>
            </div>
          `;

          const predictionTooltip = `
            <div style="background-color:#ffa500; ${tooltipStyle}">
              <div style="margin-bottom: 5px;">Predicted Water Level:</div>
              <div><strong>${item.edatetimetooltip}</strong></div>
              <div style="font-weight: bold;">${item.predicatewaterlevel} ft</div>
            </div>
          `;

          return [
            date,
            parseNumber(item.waterlevel), waterLevelTooltip,
            parseNumber(item.dangerwaterlevel), dangerLevelTooltip,
            parseNumber(item.predicatewaterlevel), predictionTooltip
          ];
        });

        // ✅ Nearest prediction to current time
        if (nearestPrediction) {
          console.log(
            "Nearest prediction to now (" + now.toLocaleTimeString() + ") >",
            nearestPrediction.time.toLocaleTimeString(),
            ":",
            nearestPrediction.waterLevel
          );
        }

        this.updateXTicks();
        this.GetTidalData();
      }
    });
  }


  updateXTicks() {
    if (this.chart.data.length > 0 && this.chart.options.hAxis) {
      const interval = Math.ceil(this.chart.data.length / 50);
      const newTicks = this.chart.data.filter((_, index) => index % interval === 0).map(item => item[0] as Date);

      this.chart = {
        ...this.chart,
        options: this.ChartOptions(1, newTicks),
      };
    }
  }

  ChartOptions(id: number, ticks: any) {
    const isMobile = window.innerWidth < 768;
    switch (id) {
      case 1:
        return {
          width: "100%",
          height: 400,
          chartArea: {
            left: isMobile ? 60 : 80,
            right: isMobile ? 15 : 30,
            top: 30,
            width: isMobile ? "90%" : "85%",
            height: isMobile ? "70%" : "75%",
          },
          responsive: true,
          backgroundColor: "transparent",
          chart: {
            style: {
              fontFamily: "Arial, sans-serif",
            },
          },
          hAxis: {
            title: "Reading Date & Times",
            format: isMobile ? "dd/MM\nHH:mm" : "dd MMM, HH:mm",
            slantedText: isMobile,
            slantedTextAngle: isMobile ? 45 : 0,
            titleTextStyle: {
              color: "#2c3e50",
              fontSize: 15,
              bold: true,
            },
            ticks: ticks,
          },
          vAxis: {
            title: "Water Level (in feet)",
            titleTextStyle: {
              color: "#2c3e50",
              fontSize: 15,
              bold: true,
            },
            textStyle: {
              color: "#000000",
              fontSize: 12,
            },
            gridlines: {
              color: "#f5f5f5",
            },
            minorGridlines: {
              color: "#fafafa",
            },
            viewWindow: {
              min: 0,
            },
            minValue: 0,
            ticks: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50],
          },
          series: {
            0: { areaOpacity: 0.3, color: "#0077b6" }, // Actual Water Level
            1: { lineWidth: 1, areaOpacity: 0, color: "#ff0000" }, // Danger Level
            // 2: { lineWidth: 2, areaOpacity: 0.3, color: "#0077b6" }, // Predicted Water Level
            // 3: { lineWidth: 2, areaOpacity: 0, color: "#ff0000", dashStyle: [4, 4] }, // High Predicted
            // 4: { lineWidth: 2, areaOpacity: 0.3, color: "#ffa500", dashStyle: [4, 4] }, // Low Predicted
          },
          tooltip: {
            isHtml: true,
          },
          legend: {
            position: isMobile ? "bottom" : "top",
            textStyle: {
              fontSize: isMobile ? 11 : 12,
            },
          },
          animation: {
            duration: 1000,
            easing: "in",
            startup: true,
          },
          explorer: { actions: ["dragToZoom", "rightClickToReset"] },
        };

      case 2:
        return {
          width: "100%",
          height: 400,
          chartArea: { width: "80%", height: "70%" },
          // responsive: true,
          animation: {
            duration: 1000,
            easing: "in",
            startup: true,
          },
          hAxis: {
            title: "Reading Date & Time",
            // slantedText: true,
            // textStyle: {
            //   color: "#2c3e50",
            //   fontSize: 12,
            // },
            titleTextStyle: {
              color: "#2c3e50",
              fontSize: 13,
              bold: true,
            },
          },
          vAxis: {
            title: "Water Level (feet)",
            textStyle: {
              color: "#2c3e50",
              fontSize: 12,
            },
            titleTextStyle: {
              color: "#2c3e50",
              fontSize: 13,
              bold: true,
            },
            gridlines: {
              color: "#a0b3c6",
            },
          },
          series: {
            0: { areaOpacity: 0.3, color: "#0077b6" },
          },
          colors: ["#0077b6"],
          legend: { position: "none" },
          explorer: { actions: ["dragToZoom", "rightClickToReset"] },
          curveType: "function",
          lineWidth: 3,
          pointSize: 5,
        };

      default:
        return {};
    }
  }

  chart2 = {
    title: "Reading Date & Time",
    type: ChartType.LineChart,
    data: [] as (string | number)[][],
    columnNames: ["Date", "Water Level (feet)"],
    options: this.ChartOptions(2, []),
  };

  getChartOptions() {
    const previousTicks = this.chart.options?.hAxis?.ticks ?? [];
    this.chart.options = this.ChartOptions(1, previousTicks);
    this.chart2.options = this.ChartOptions(2, []);
  }
  // GetRefreshTimer() {
  //   this.anotherSubscription = this._MasterService.GetRefreshTimeMaster(1).subscribe((res: any) => {
  //     this.RefreshTimeList = JSON.parse(JSON.stringify(res["Table"]));
  //     this.SirenRefreshTimerHandler = setInterval(() => {
  //       this.GetSirenLocation();
  //     }, this.RefreshTimeList[0].SirenRefreshTime * 1);

  //     this.CurrentReadingRefreshHandler = setInterval(() => {
  //       this.GetReadingLocationData();
  //     }, this.RefreshTimeList[0].CurrentReadingRefreshTime * 1);

  //     this.ChartRefreshTimerHandler = setInterval(() => {
  //       this.GetTidalData();
  //     }, this.RefreshTimeList[0].ChartRefreshTime * 1);
  //   });
  // }
  async GetSensorData() {
    this.anotherSubscription = await this._MasterService.GetDashboardSensorData().subscribe((res: any) => {
      this.SensorStatus = JSON.parse(JSON.stringify(res["Table"]));
      this.SensorStatus = this.SensorStatus.map(items => {
        items.reading_MA = [[items.Reading_mA]];

        const readMtr = parseFloat(items.READ_MTR);
        const minWaterLevel = parseFloat(items.MinWaterLevel);
        const maxWaterLevel = parseFloat(items.MaxWaterLevel);

        // Apply the formula
        let percentage = 100 - (readMtr * 100) / (maxWaterLevel - minWaterLevel);

        // If percentage exceeds 100%, cap it to 99.5%
        if (percentage < 0) {
          percentage = 0;
        }

        if (percentage >= 100) {
          percentage = 99.99;
        }

        items.percentage = parseFloat(percentage.toFixed(2));
        items.percentage = 100 - items.percentage;
        return items;
      });
    });
  }

  GetAffectedVillageLocation() {
    this.anotherSubscription = this._MasterService.GetAffectedVillages(this.ReadingLocationID).subscribe((res: any) => {
      this.VillageMapData = JSON.parse(JSON.stringify(res["Table"]));
    });
  }

  OpenVillageMap() {
    const dialogConfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogConfig);
    dialogConfig.width = "100%";
    dialogConfig.panelClass = ["full-screen-modal"];
    dialogConfig.panelClass = "mat-dialog-map";
    dialogConfig.data = {
      IsDashboard: true,
      arrayForDialog: this.VillageMapData,
    };

    dialogConfig.closeOnNavigation = true;
    const dialogRef = this.dialog.open(MapDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
  }

  getVillageData() {
    this.anotherSubscription = this._MasterService.GetAffectedVillages(this.ReadingLocationID).subscribe((res: any) => {
      const dataArray = res.Table || [];
      const redVillages = dataArray.filter((item: any) => item.cStatus?.toUpperCase() === "RED");
      const yellowVillages = dataArray.filter((item: any) => item.cStatus?.toUpperCase() === "YELLOW");
      const WhiteVillages = dataArray.filter((item: any) => item.cStatus?.toUpperCase() === "WHITE");
      this.totalRedAlert = redVillages.length;
      this.totalYellowAlert = yellowVillages.length;
      this.totalwhiteAlert = WhiteVillages.length;

      // Extract village names
      this.redAlertVillages = redVillages.map((item: any) => item.NAME);
      this.yellowAlertVillages = yellowVillages.map((item: any) => item.NAME);
      this.whiteAlertVillages = WhiteVillages.map((item: any) => item.NAME);
    });
  }

  onFullView() {
    const optionDiv = document.getElementById("full-screen-container");
    if (optionDiv?.requestFullscreen) {
      optionDiv.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    if (this.IsFullScreen) {
      const cancelFullScreen = document.exitFullscreen;
      cancelFullScreen.call(document);
    }
    optionDiv?.addEventListener("fullscreenchange", () => {
      this.IsFullScreen = document.fullscreen;
    });
  }

  override ngOnDestroy(): void {
    clearInterval(this.ChartRefreshTimerHandler);
    clearInterval(this.SirenRefreshTimerHandler);
    clearInterval(this.CurrentReadingRefreshHandler);
    // Clean up event listeners
    window.removeEventListener("resize", this.onResize.bind(this));

    // Unsubscribe from sidebar toggle events
    if (this.sidebarToggleSubscription) {
      this.sidebarToggleSubscription.unsubscribe();
    }
  }

  getProgressWidth(): string {
    return `${(this.selectedIndex / (this.daysOptions.length - 1)) * 100}%`;
  }

  // getWaterLevel(readingFT: number): string {
  //   const maxLevel = 100;
  //   const level = Math.min(readingFT || 0, maxLevel);
  //   const percentage = (level / maxLevel) * 100;
  //   return `${percentage}%`;
  // }

  // getWaterClass(readingFT: number): string {
  //   if (readingFT <= 30) {
  //     return "water-low";
  //   } else if (readingFT > 30 && readingFT <= 70) {
  //     return "water-medium";
  //   } else {
  //     return "water-high";
  //   }
  // }

  async GetTidalData() {

    this.anotherSubscription = await this._MasterService.GetTidalData(this.ReadingLocationID, this.topRowNumber).subscribe((res: any) => {
      const { Table } = res;
      if (Table && Table.length > 0) {
        let filteredData: [string, number][] = [];

        for (let i = 1; i < Table.length - 1; i++) {
          let prev = Table[i - 1].Height;
          let curr = Table[i].Height;
          let next = Table[i + 1].Height;

          if ((curr > prev && curr > next) || (curr < prev && curr < next)) {
            filteredData.push([Table[i].EDateTime, curr]);
          }
        }
        this.chart2.data = filteredData;
      }
    });
  }
  // GetWhetherData() {
  //   fetch("https://api.openweathermap.org/data/2.5/weather?lat=21.700739&lon=72.991613&appid=3d6fb206398e0036ee2ae85337940672")
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setWeatherData(data);
  //     });
  // }
  // setWeatherData(data: any) {
  //   this.WeatherData = data;
  //   let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
  //   this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
  //   let currentDate = new Date();
  //   this.WeatherData.isDay = currentDate.getTime() < sunsetTime.getTime();
  //   this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
  //   this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
  //   this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
  //   this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  // }
}
