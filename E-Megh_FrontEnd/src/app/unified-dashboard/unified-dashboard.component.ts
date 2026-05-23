import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UnSubscriber } from "../_shared/UnSubscriber";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MasterService, GlobalService } from "../_services";
import { ChartType } from "angular-google-charts";
import { MapDialogComponent } from "../_shared/map-dialog/map-dialog.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-unified-dashboard",
  templateUrl: "./unified-dashboard.component.html",
  styleUrls: ["./unified-dashboard.component.scss"],
})
export class UnifiedDashboardComponent extends UnSubscriber implements OnInit, AfterViewInit, OnDestroy {
  // Weather
  WeatherData: any = { main: {}, weather: [{}], isDay: true };

  // Location and Navigation Options
  ReadingLocationID: number = 1;
  LocationList: any[] = [];
  IsFullScreen: boolean = false;

  // Alerts and Village Data
  totalRedAlert: number = 0;
  totalYellowAlert: number = 0;
  totalwhiteAlert: number = 0;
  redAlertVillages: string[] = [];
  yellowAlertVillages: string[] = [];
  whiteAlertVillages: string[] = [];
  VillageMapData: any[] = [];

  // Sensor and Siren Statuses
  SensorStatus: any[] = [];
  groupedSirenLocations: any[] = [];

  // Date/Time tracking for chart range
  ToDate: Date = new Date();
  FromDate: Date = new Date();

  // Days control
  daysOptions = [
    { id: 0, name: "Live" },
    { id: 5, name: "5 Days" },
    { id: 7, name: "7 Days" },
    { id: 15, name: "15 Days" },
    { id: 30, name: "30 Days" },
  ];
  selectedIndex: number = 0;
  selectedDays: number = this.daysOptions[0].id;

  // Auto-refresh handlers
  private refreshTimer: any;
  private sidebarToggleSubscription: Subscription | undefined;
  private resizeTimeout: any;

  // Chart configuration (Actual vs Danger vs Prediction)
  chart = {
    title: "Reading Date & Times",
    type: ChartType.AreaChart,
    data: [] as (Date | number | string)[][],
    columnNames: [
      "Reading Date & Time",
      "Water Level (feet)",
      { type: "string", role: "tooltip", p: { html: true } },
      "Danger Level (feet)",
      { type: "string", role: "tooltip", p: { html: true } },
      "Prediction Level (feet)",
      { type: "string", role: "tooltip", p: { html: true } }
    ],
    options: this.ChartOptions(1, []),
  };

  constructor(
    private _MasterService: MasterService,
    private _GlobalService: GlobalService,
    private dialog: MatDialog
  ) {
    super();
  }

  async ngOnInit() {
    this.GetReadingLocationData();
    this.GetDailyReadingData(this.ReadingLocationID, 241);
    this.GetSensorData();
    this.GetSirenLocation();
    this.GetAffectedVillageLocation();
    this.getVillageData();
    this.GetWeatherData();

    // Set up auto-refresh every 30 seconds for live telemetry
    this.refreshTimer = setInterval(() => {
      this.GetSensorData();
      this.GetSirenLocation();
      if (this.selectedDays === 0) {
        this.GetDailyReadingData(this.ReadingLocationID, 241);
      }
    }, 30000);

    // Sidebar resize binding
    this._GlobalService.IsSidebarOpen.subscribe((isOpen) => {
      setTimeout(() => {
        this.refreshChart();
      }, 1000);
    });
  }

  ngAfterViewInit() {
    this.refreshChart();
    setTimeout(() => {
      this.refreshChart();
    }, 500);

    window.addEventListener("resize", this.onResize.bind(this));

    this.sidebarToggleSubscription = this._GlobalService.sidebarToggle$.subscribe(() => {
      setTimeout(() => {
        this.refreshChart();
      }, 300);
    });
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?: any) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.refreshChart();
    }, 200);
  }

  refreshChart() {
    if (this.chart?.data && this.chart.data.length > 0) {
      const currentTicks = this.chart.options?.hAxis?.ticks || [];
      const options = this.ChartOptions(1, currentTicks);
      const chartAreaOptions: any = {
        ...options.chartArea,
        width: "92%",
        left: "5%",
        right: "3%",
      };

      const chartOptions: any = {
        ...options,
        width: "100%",
        chartArea: chartAreaOptions,
      };

      this.chart = {
        ...this.chart,
        options: chartOptions,
      };
    }
  }

  GetReadingLocationData() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      this.LocationList = Table;
      this._GlobalService.dynamicInputSelect(this.LocationList, "RLID", item => `${item.Name}`);
    });
  }

  onDaysChange() {
    this.selectedIndex = 0;
    this.selectedDays = this.daysOptions[0].id;

    // Refresh telemetry and charts for new location
    this.GetDailyReadingData(this.ReadingLocationID, 241);
    this.GetAffectedVillageLocation();
    this.getVillageData();
  }

  changeDays(step: number) {
    const newIndex = this.selectedIndex + step;
    if (newIndex >= 0 && newIndex < this.daysOptions.length) {
      this.selectedIndex = newIndex;
      this.selectedDays = this.daysOptions[newIndex].id;
      if (this.selectedDays === 0) {
        this.GetDailyReadingData(this.ReadingLocationID, 241);
      } else {
        this._MasterService.GetTopRowNumber(this.ReadingLocationID, this.selectedDays).subscribe((res: any) => {
          this.GetDailyReadingData(this.ReadingLocationID, res.TopRowNumber);
        });
      }
    }
  }

  async GetDailyReadingData(ReadingLocationID: number, TopRowNumber: number) {
    this.chart.data = [];

    await this._MasterService.GetDailyReadingData(ReadingLocationID, TopRowNumber).subscribe((res: any) => {
      const { Table } = res;
      if (Table && Table[0] && Table[0].length > 0) {
        this.ToDate = Table[0][0].mDateTime;
        this.FromDate = Table[0][Table[0].length - 1].mDateTime;

        const now = new Date();
        let closestRow = Table[0].reduce((prev: any, curr: any) => {
          const prevDiff = Math.abs(new Date(prev.mDateTime).getTime() - now.getTime());
          const currDiff = Math.abs(new Date(curr.mDateTime).getTime() - now.getTime());
          return (currDiff < prevDiff ? curr : prev);
        });

        const nearestPrediction = {
          time: new Date(closestRow.mDateTime),
          waterLevel: +closestRow.predicatewaterlevel
        };

        const sixHoursLater = new Date(nearestPrediction.time.getTime() + 6 * 60 * 60 * 1000);
        const filteredTable = Table[0].filter((item: any) => {
          const itemTime = new Date(item.mDateTime);
          return itemTime <= sixHoursLater;
        });

        this.chart.data = filteredTable.map((item: any) => {
          const date = new Date(item.mDateTime);
          const parseNumber = (value: any): number | null =>
            (value !== null && value !== undefined && !isNaN(+value) ? +value : null);

          const tooltipStyle = `
            color: white;
            font-size: 14px;
            padding: 8px 12px;
            border-radius: 5px;
            text-align: center;
            width: fit-content;
            margin: 5px auto;
            line-height: 1.6;
            font-family: 'Lexend Deca', sans-serif;
          `;

          const waterLevelTooltip = `
            <div style="background-color: #0077b6; ${tooltipStyle}">
              <div style="margin-bottom: 5px;">Actual Water Level:</div>
              <div><strong>${item.edatetimetooltip}</strong></div>
              <div style="font-weight: bold; font-size: 16px;">${item.waterlevel} ft</div>
            </div>
          `;

          const dangerLevelTooltip = `
            <div style="background-color: #dc3545; ${tooltipStyle}">
              <div style="margin-bottom: 5px;">Danger Water Level:</div>
              <div><strong>${item.edatetimetooltip}</strong></div>
              <div style="font-weight: bold; font-size: 16px;">${item.dangerwaterlevel} ft</div>
            </div>
          `;

          const predictionTooltip = `
            <div style="background-color: #ff9800; ${tooltipStyle}">
              <div style="margin-bottom: 5px;">Predicted Water Level:</div>
              <div><strong>${item.edatetimetooltip}</strong></div>
              <div style="font-weight: bold; font-size: 16px;">${item.predicatewaterlevel} ft</div>
            </div>
          `;

          return [
            date,
            parseNumber(item.waterlevel), waterLevelTooltip,
            parseNumber(item.dangerwaterlevel), dangerLevelTooltip,
            parseNumber(item.predicatewaterlevel), predictionTooltip
          ];
        });

        this.updateXTicks();
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
    return {
      width: "100%",
      height: 400,
      chartArea: {
        left: isMobile ? 50 : 70,
        right: isMobile ? 15 : 20,
        top: 40,
        width: isMobile ? "90%" : "88%",
        height: isMobile ? "70%" : "75%",
      },
      responsive: true,
      backgroundColor: "transparent",
      fontName: "Lexend Deca, Arial, sans-serif",
      hAxis: {
        title: "Reading Date & Times",
        format: isMobile ? "dd/MM\nHH:mm" : "dd MMM, HH:mm",
        slantedText: isMobile,
        slantedTextAngle: isMobile ? 45 : 0,
        titleTextStyle: {
          color: "#475569",
          fontSize: 13,
          bold: true,
        },
        textStyle: {
          color: "#64748b",
          fontSize: 10,
        },
        ticks: ticks,
        gridlines: { color: "transparent" }
      },
      vAxis: {
        title: "Water Level (in feet)",
        titleTextStyle: {
          color: "#475569",
          fontSize: 13,
          bold: true,
        },
        textStyle: {
          color: "#0f172a",
          fontSize: 11,
          bold: true
        },
        gridlines: {
          color: "#f1f5f9",
        },
        minorGridlines: {
          color: "#f8fafc",
        },
        viewWindow: {
          min: 0,
        },
        minValue: 0,
        ticks: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50],
      },
      series: {
        0: { areaOpacity: 0.15, color: "#0ea5e9", lineWidth: 3 }, // Actual Water Level
        1: { lineWidth: 2, areaOpacity: 0, color: "#ef4444" }, // Danger Level
        2: { lineWidth: 2, areaOpacity: 0.08, color: "#f97316", dashStyle: [4, 4] }, // Predicted Level
      },
      tooltip: {
        isHtml: true,
      },
      legend: {
        position: "top",
        alignment: "center",
        textStyle: {
          color: "#334155",
          fontSize: 12,
          bold: true
        },
      },
      animation: {
        duration: 800,
        easing: "out",
        startup: true,
      },
      explorer: { actions: ["dragToZoom", "rightClickToReset"] },
    };
  }

  async GetSensorData() {
    this.anotherSubscription = await this._MasterService.GetDashboardSensorData().subscribe((res: any) => {
      const statusList = JSON.parse(JSON.stringify(res["Table"]));
      this.SensorStatus = statusList.map((items: any) => {
        items.reading_MA = [[items.Reading_mA]];

        const readMtr = parseFloat(items.READ_MTR);
        const minWaterLevel = parseFloat(items.MinWaterLevel);
        const maxWaterLevel = parseFloat(items.MaxWaterLevel);

        const TotalGrossStorage = parseFloat(items.TotalGrossStorage);
        const CurrentGrossStorage = parseFloat(items.GrossStorage);

        let percentage = 100 - (readMtr * 100) / (maxWaterLevel - minWaterLevel);
        let percentageforreservoir = (CurrentGrossStorage * 100) / TotalGrossStorage;

        if (percentage < 0) percentage = 0;
        if (percentage >= 100) percentage = 99.99;

        items.percentage = parseFloat(percentage.toFixed(2));
        items.percentageforreservoir = parseFloat(percentageforreservoir.toFixed(2));
        items.percentage = 100 - items.percentage;
        return items;
      });
    });
  }

  async GetSirenLocation() {
    this.anotherSubscription = await this._MasterService.GetDashboardSirenData().subscribe((res: any) => {
      const sirens = JSON.parse(JSON.stringify(res["Table"]));

      // Group sirens by parent LocationID
      const grouped = sirens.reduce((acc: any, siren: any) => {
        const key = siren.LocationID;
        if (!acc[key]) {
          acc[key] = {
            LocationID: siren.LocationID,
            LocationName: siren.LocationName,
            Sirens: [],
          };
        }
        acc[key].Sirens.push(siren);
        return acc;
      }, {});

      this.groupedSirenLocations = Object.values(grouped);
    });
  }

  getWaterLevel(readingFT: number): string {
    const maxLevel = 100;
    const level = Math.min(readingFT || 0, maxLevel);
    const percentage = (level / maxLevel) * 100;
    return `${percentage}%`;
  }

  getWaterClass(readingFT: number): string {
    if (readingFT <= 30) {
      return "water-low";
    } else if (readingFT > 30 && readingFT <= 70) {
      return "water-medium";
    } else {
      return "water-high";
    }
  }

  GetAffectedVillageLocation() {
    this.anotherSubscription = this._MasterService.GetAffectedVillages(this.ReadingLocationID).subscribe((res: any) => {
      this.VillageMapData = JSON.parse(JSON.stringify(res["Table"]));
    });
  }

  OpenVillageMap() {
    const dialogConfig = new MatDialogConfig();
    this._GlobalService.matDialogDefaultConfig(dialogConfig);
    dialogConfig.width = "60vw";
    dialogConfig.maxWidth = "1000px";

    dialogConfig.panelClass = ["centered-map-dialog", "mat-dialog-map"];
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

      this.redAlertVillages = redVillages.map((item: any) => item.NAME);
      this.yellowAlertVillages = yellowVillages.map((item: any) => item.NAME);
      this.whiteAlertVillages = WhiteVillages.map((item: any) => item.NAME);
    });
  }

  GetWeatherData() {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=20.610163&lon=72.9343&appid=3d6fb206398e0036ee2ae85337940672")
      .then(response => response.json())
      .then(data => {
        this.WeatherData = data;
        let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
        this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
        let currentDate = new Date();
        this.WeatherData.isDay = currentDate.getTime() < sunsetTime.getTime();
        this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
        this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
        this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
        this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
      });
  }

  getProgressWidth(): string {
    return `${(this.selectedIndex / (this.daysOptions.length - 1)) * 100}%`;
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
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
    window.removeEventListener("resize", this.onResize.bind(this));

    if (this.sidebarToggleSubscription) {
      this.sidebarToggleSubscription.unsubscribe();
    }
  }
}
