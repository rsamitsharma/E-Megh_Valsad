import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from "@angular/core";
import { UnSubscriber } from "../_shared/UnSubscriber";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MasterService, GlobalService } from "../_services";
import { ChartType } from "angular-google-charts";
import { MapDialogComponent } from "../_shared/map-dialog/map-dialog.component";
import { Subscription } from "rxjs";
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

interface Marker {
  lat: number;
  lng: number;
  dragable: boolean;
  Type: string;
  Icon: string;
  Name: string;
  YELLOW_MIN: number;
  WHITE_MIN: number;
  RED_MIN: number;
}


@Component({
  selector: 'app-fulldashboard',
  templateUrl: './fulldashboard.component.html',
  styleUrls: ['./fulldashboard.component.scss']
})
export class FulldashboardComponent extends UnSubscriber implements OnInit, AfterViewInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  selectedVillage: any = null;
  selectedsiren: any = null;
  activeSlideIndex = 0;
  slideCount = 3;
  intervalId: any;
  location = {
    lat: 21.703369345524255,
    lng: 72.9995584487915,
    altitude: 0,
    marker: {
      lat: 21.703369345524255,
      lng: 72.9995584487915,
      draggable: false,
    },
    zoom: 12,
  };
  topRowNumber: number = 10;
  WeatherData: any;
  waterLevelData: any = "";
  ReadingLocationID: number = 1;
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
  markers: Marker[] = [];
  groupedSirenLocations: any[] = [];
  FromDate: Date = new Date();
  ToDate: Date = new Date();
  SizeScale: google.maps.Size = {
    width: 40,
    height: 40,
    equals: () => true,
  };
  MapVillage: any[] = [];
  MapSiren: any[] = [];
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
  clickEventHandler: any;
  selectedIndex: number = 0;
  selectedDays: number = this.daysOptions[0].id;
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };
  private sidebarToggleSubscription: Subscription | undefined;
  isPlaying: boolean = true;

  constructor(private _MasterService: MasterService, private _GlobalService: GlobalService, private dialog: MatDialog, private zone: NgZone) {
    super();
  }

  chart = {
    title: "Reading Date & Times",
    type: ChartType.AreaChart,
    data: [] as (Date | number | string)[][], // Correct Type Definition

    columnNames: ["Reading Date & Time", "Actual Water Level (feet)", { type: "string", role: "tooltip", p: { html: true } }, "Danger Level (feet)", { type: "string", role: "tooltip", p: { html: true } }, "Prediction Level (feet)", { type: "string", role: "tooltip", p: { html: true } }],
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
  ngOnInit() {
    this.getVillageData();
    this.GetReadingLocationData();
    this.GetDailyReadingData(this.ReadingLocationID, 241);
    this._GlobalService.IsSidebarOpen.subscribe((isOpen) => {
      console.log("Sidebar state changed:", isOpen);
      setTimeout(() => {

        this.refreshChart();
      }, 5000);
    });
    this.startSlideshow();
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.startSlideshow()
    } else {
      this.stopSlideshow()
    }
  }
  stopSlideshow() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startSlideshow() {
    this.stopSlideshow(); // Clear any existing interval
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.slideCount;
    this.startSlideshow(); // Restart the slideshow after changing slide
  }

  previousSlide() {
    this.activeSlideIndex = (this.activeSlideIndex - 1 + this.slideCount) % this.slideCount;
    this.startSlideshow(); // Restart the slideshow after changing slide
  }

  GetReadingLocationData() {
    this.anotherSubscription = this._MasterService.GetReadingLocationMaster(true, 0).subscribe((res: any) => {
      const { Table } = res;
      this.LocationList = Table;
      this._GlobalService.dynamicInputSelect(this.LocationList, "RLID", item => `${item.Name}`);
    });
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

    this.anotherSubscription = await this._MasterService.GetDailyReadingData(ReadingLocationID, TopRowNumber).subscribe((res: any) => {
      const { Table } = res;

      // Handle water level data
      if (Table && Table.length > 0) {
        this.waterLevelData = Table[1][0];
        console.log(this.waterLevelData.EDateTime);
      }

      this.ToDate = Table[0][0].mDateTime;  // first row, first element
      this.FromDate = Table[0][Table[0].length - 1].mDateTime;  // first row, last element

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
            <div style="background-color: #0077b6; ${tooltipStyle}">
              <div style="margin-bottom: 5px;">Predicted Water Level:</div>
              <div><strong>${item.edatetimetooltip}</strong></div>
              <div style="font-weight: bold;">${item.predicatewaterlevel} ft</div>
            </div>
          `;

          if (isNaN(+item.waterlevel)) {
            console.warn("Invalid WaterLevel:", item.waterlevel, item);
          }

          return [
            date,
            parseNumber(item.waterlevel),
            waterLevelTooltip,
            parseNumber(item.dangerwaterlevel),
            dangerLevelTooltip,
            parseNumber(item.predicatewaterlevel),
            predictionTooltip
          ];
        });

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

  getVillageData() {
    this.anotherSubscription = this._MasterService.GetAffectedVillages(this.ReadingLocationID).subscribe((res: any) => {
      const { Table } = res;

      this.MapVillage = Table.filter((item: any) => item.TYPE === "VILLAGE");
      // Combine SIREN and READLOCATION
      this.MapSiren = Table.filter(
        (item: any) => item.TYPE === "SIRENLOCATION" || item.TYPE === "READLOCATION"
      );
    });
  }


  alertSVGIcon =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
   <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg">
  <!-- Drop shadow for the marker -->
  <filter id="shadow" x="-20%" y="-10%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="6" result="blur"/>
    <feOffset in="blur" dx="4" dy="10" result="offsetBlur"/>
    <feComposite in="SourceGraphic" in2="offsetBlur" operator="over"/>
  </filter>

  <!-- Main marker shape -->
  <path d="M120,20 C66,20 20,66 20,120 C20,174 120,300 120,300 C120,300 220,174 220,120 C220,66 174,20 120,20 Z"
        fill="#0055ff" stroke="#003399" stroke-width="6" filter="url(#shadow)"/>

  <!-- Inner circle background -->
  <circle cx="120" cy="120" r="70" fill="#ffffff" opacity="0.9"/>

  <!-- Radar/Sensor Design -->
  <circle cx="120" cy="120" r="60" fill="none" stroke="#0055ff" stroke-width="2"/>
  <circle cx="120" cy="120" r="45" fill="none" stroke="#0055ff" stroke-width="2"/>
  <circle cx="120" cy="120" r="30" fill="none" stroke="#0055ff" stroke-width="2"/>
  <circle cx="120" cy="120" r="15" fill="#0055ff"/>

  <!-- Radar Sweep Animation -->
  <path d="M120,120 L120,60 A60,60 0 0,1 174,150 Z" fill="#0055ff" opacity="0.6">
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 120 120"
      to="360 120 120"
      dur="4s"
      repeatCount="indefinite"/>
  </path>

  <!-- Crosshairs -->
  <line x1="120" y1="60" x2="120" y2="180" stroke="#0055ff" stroke-width="2"/>
  <line x1="60" y1="120" x2="180" y2="120" stroke="#0055ff" stroke-width="2"/>

  <!-- Sensor Dots -->
  <circle cx="150" cy="90" r="5" fill="#00ccff">
    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="90" cy="140" r="4" fill="#00ccff">
    <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="160" cy="140" r="3" fill="#00ccff">
    <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite"/>
  </circle>

  <!-- Gloss effect -->
  <ellipse cx="120" cy="80" rx="60" ry="20" fill="#ffffff" opacity="0.3"/>

  <!-- Outer Sensor Rings Animation -->
  <circle cx="120" cy="120" r="60" fill="none" stroke="#0055ff" stroke-width="1" opacity="0">
    <animate attributeName="r" values="15;70;15" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite"/>
  </circle>
</svg>
  `);

  alertSIRENIcon =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
  <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
  <!-- Drop shadow for the marker -->
  <filter id="shadow" x="-20%" y="-10%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feOffset in="blur" dx="2" dy="5" result="offsetBlur"/>
    <feComposite in="SourceGraphic" in2="offsetBlur" operator="over"/>
  </filter>

  <!-- Main marker shape -->
  <path d="M60,10 C33,10 10,33 10,60 C10,87 60,150 60,150 C60,150 110,87 110,60 C110,33 87,10 60,10 Z"
        fill="#ff0000" stroke="#990000" stroke-width="3" filter="url(#shadow)"/>

  <!-- Inner background -->
  <circle cx="60" cy="60" r="35" fill="#ffffff" opacity="0.9"/>

  <!-- Siren group - this will rotate -->
  <g id="siren">
    <!-- Applying rotation animation to the entire siren group -->
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 60 60"
      to="360 60 60"
      dur="2s"
      repeatCount="indefinite"/>

    <!-- Siren body -->
    <rect x="45" y="43" width="30" height="25" rx="2" fill="#cc0000"/>

    <!-- Siren dome -->
    <path d="M45,43 Q60,30 75,43" fill="none" stroke="#cc0000" stroke-width="4"/>
    <ellipse cx="60" cy="43" rx="15" ry="5" fill="#ff3333"/>

    <!-- Siren light -->
    <circle cx="60" cy="43" r="8" fill="#ffff00">
      <animate attributeName="fill" values="#ffff00;#ffffff;#ffff00" dur="0.5s" repeatCount="indefinite"/>
    </circle>

    <!-- Warning stripes on siren body -->
    <rect x="45" y="48" width="30" height="5" fill="#ffff00"/>
    <rect x="45" y="58" width="30" height="5" fill="#ffff00"/>
  </g>

  <!-- Sound waves - kept outside rotation group for stable effect -->
  <path d="M35,50 Q32,43 35,36" stroke="#0066ff" stroke-width="2" fill="none">
    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
  </path>
  <path d="M30,53 Q25,43 30,33" stroke="#0066ff" stroke-width="2" fill="none">
    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.2s"/>
  </path>
  <path d="M85,50 Q88,43 85,36" stroke="#0066ff" stroke-width="2" fill="none">
    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
  </path>
  <path d="M90,53 Q95,43 90,33" stroke="#0066ff" stroke-width="2" fill="none">
    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.2s"/>
  </path>

  <!-- Additional circular sound waves for rotating effect -->
  <circle cx="60" cy="60" r="25" fill="none" stroke="#0066ff" stroke-width="1.5" opacity="0">
    <animate attributeName="r" values="25;40;25" dur="1.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;0.5;0" dur="1.5s" repeatCount="indefinite"/>
  </circle>

  <!-- Pulse animation for alert effect -->
  <circle cx="60" cy="60" r="45" fill="none" stroke="#ff0000" stroke-width="3" opacity="0">
    <animate attributeName="r" values="45;55;45" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>
  `);


  getMarkerOptions(item: any, type: 'village' | 'siren'): google.maps.MarkerOptions {
    let iconUrl = 'assets/icons/default-pin.png';

    if (type === 'village') {
      switch (item.cStatus?.toUpperCase()) {
        case 'WHITE':
          iconUrl = 'http://maps.google.com/mapfiles/kml/paddle/wht-circle.png';
          break;
        case 'YELLOW':
          iconUrl = 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png';
          break;
        case 'RED':
          iconUrl = 'http://maps.google.com/mapfiles/kml/paddle/red-circle.png';
          break;
      }
    } else if (type === 'siren') {
      switch (item.TYPE?.toUpperCase()) {
        case 'READLOCATION':
          iconUrl = this.alertSVGIcon;
          break;
        case 'SIRENLOCATION':
          iconUrl = this.alertSIRENIcon;
          break;
        default:
          iconUrl = this.alertSVGIcon;
          break;
      }
    }

    return {
      icon: {
        url: iconUrl,
        scaledSize: new google.maps.Size(40, 40),
      },
      title: item.NAME,
    };
  }

  openInfoWindowForVillage(marker: MapMarker, village: any) {
    this.selectedVillage = village;
    this.infoWindow.open(marker);
  }

  openInfoWindowForSiren(marker: MapMarker, siren: any) {
    this.selectedsiren = siren;
    this.infoWindow.open(marker);
  }

  OnMouseOver(infoWindow: any) {
    infoWindow.open();
  }

  OnMouseOut(infoWindow: any) {
    infoWindow.close();
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
    this.stopSlideshow();
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
}
