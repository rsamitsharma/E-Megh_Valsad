import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { GlobalService, MasterService } from "../_services";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UnSubscriber } from "../_shared/UnSubscriber";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent extends UnSubscriber implements OnInit {
  constructor(private _MasterService: MasterService, private _GlobalService: GlobalService, private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.GetReadingLocationData();
    this.GetSirenLocation();
    this.GetSensorData();
    // this.GetRefreshTimer();
    this.WeatherData = {
      main: {},
      isDay: true,
    };
    this.GetWhetherData();
  }

  // #region variable
  WeatherData: any;
  ReadingLocationID: number = 1;
  LocationList: any[] = [];
  SirenLocation: any[] = [];
  SensorStatus: any[] = [];
  IsFullScreen: boolean = false;
  totalRedAlert: number = 0;
  totalYellowAlert: number = 0;
  redAlertVillages: string[] = [];
  yellowAlertVillages: string[] = [];
  @ViewChild("redBox") redBox!: ElementRef;
  @ViewChild("yellowBox") yellowBox!: ElementRef;
  autoScrollInterval: any;
  Days: number = 30;
  groupedSirenLocations: any[] = [];

  RefreshTimeList: any[] = [];
  SirenRefreshTimerHandler: any;
  ChartRefreshTimerHandler: any;
  CurrentReadingRefreshHandler: any;
  VillageMapData: any[] = [];
  TidalData: any[] = [];
  daysOptions = [
    { id: 0, name: "Live" },
    { id: 3, name: "3 Days" },
    { id: 5, name: "5 Days" },
    { id: 7, name: "7 Days" },
    { id: 15, name: "15 Days" },
    { id: 30, name: "30 Days" },
  ];
  selectedIndex: number = 0;
  selectedDays: number = this.daysOptions[0].id;

  // #endregion

  getProgressWidth(): string {
    return `${(this.selectedIndex / (this.daysOptions.length - 1)) * 100}%`;
  }

  GetReadingLocationData() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      this.LocationList = Table;
      this._GlobalService.dynamicInputSelect(this.LocationList, "RLID", item => `${item.Name}`);
    });
  }

 async GetSirenLocation() {
    this.anotherSubscription = await this._MasterService.GetDashboardSirenData().subscribe((res: any) => {
      const sirens = JSON.parse(JSON.stringify(res["Table"]));

      // Group by LocationID
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

 async GetSensorData() {
    this.anotherSubscription = await this._MasterService.GetDashboardSensorData().subscribe((res: any) => {

      this.SensorStatus = JSON.parse(JSON.stringify(res["Table"]));
      this.SensorStatus = this.SensorStatus.map(items => {
        items.reading_MA = [[items.Reading_mA]];

        const readMtr = parseFloat(items.READ_MTR);
        const minWaterLevel = parseFloat(items.MinWaterLevel);
        const maxWaterLevel = parseFloat(items.MaxWaterLevel);
        
        const TotalGrossStorage = parseFloat(items.TotalGrossStorage);
        const CurrentGrossStorage = parseFloat(items.GrossStorage);
        // Apply the formula
        let percentage = 100 - (readMtr * 100) / (maxWaterLevel - minWaterLevel);

        let percentageforreservoir = (CurrentGrossStorage * 100) / TotalGrossStorage;

        // If percentage exceeds 100%, cap it to 99.5%
        if (percentage < 0) {
          percentage = 0;
        }

        if (percentage >= 100) {
          percentage = 99.99;
        }

        items.percentage = parseFloat(percentage.toFixed(2));
        items.percentageforreservoir = parseFloat(percentageforreservoir.toFixed(2));
        items.percentage = 100 - items.percentage;
        return items;
      });
    });
  }

  GetRefreshTimer() {
    this.anotherSubscription = this._MasterService.GetRefreshTimeMaster(1).subscribe((res: any) => {
      this.RefreshTimeList = JSON.parse(JSON.stringify(res["Table"]));
      this.SirenRefreshTimerHandler = setInterval(() => {
        this.GetSirenLocation();
      }, this.RefreshTimeList[0].SirenRefreshTime * 1);

      this.CurrentReadingRefreshHandler = setInterval(() => {
        this.GetReadingLocationData();
      }, this.RefreshTimeList[0].CurrentReadingRefreshTime * 1);

      this.ChartRefreshTimerHandler = setInterval(() => {}, this.RefreshTimeList[0].ChartRefreshTime * 1);
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
      const cancellFullScreen = document.exitFullscreen;
      cancellFullScreen.call(document);
    }
    optionDiv?.addEventListener("fullscreenchange", () => {
      this.IsFullScreen = document.fullscreen;
    });
  }

  override ngOnDestroy(): void {
    clearInterval(this.ChartRefreshTimerHandler);
    clearInterval(this.SirenRefreshTimerHandler);
    clearInterval(this.CurrentReadingRefreshHandler);
  }

  GetWhetherData() {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=21.700739&lon=72.991613&appid=3d6fb206398e0036ee2ae85337940672")
      .then(response => response.json())
      .then(data => {
        this.setWeatherData(data);
      });
  }
  setWeatherData(data: any) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = currentDate.getTime() < sunsetTime.getTime();
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }
}
