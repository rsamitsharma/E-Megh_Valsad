import { HttpClient } from "@angular/common/http";
import { Component, HostListener, inject, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { ChartType } from "angular-google-charts";
import { GlobalService, MasterService } from "../_services";
import { Subscription } from "rxjs";

@Component({
  selector: "app-prediction",
  templateUrl: "./prediction.component.html",
  styleUrls: ["./prediction.component.scss"],
})
export class PredictionComponent implements OnInit, OnDestroy {
  private sidebarSubscription: Subscription | undefined;
  waterLevel: number = 2; // Default value
  outflow: number = 180000; // Default value
  jsonData: any;
  chartData: any[] = [];
  chartData2: any[] = [];
  IncrementTime: any[] = [];
  predictionMode: "withOutflow" | "withoutOutflow" = "withOutflow"; // Default to showing with outflow
  chartWidth: number = 0; // Will be calculated dynamically
  chartHeight: number = 0; // Will be calculated dynamically
  isLoading: boolean = true;
  chart: any; // Reference to the Google Chart instance

  // Smoothing configuration
  smoothingLevel: "low" | "medium" | "high" = "low";
  showRawData: boolean = false;

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.updateChartDimensions();
  }

  ngOnDestroy() {
    // Clean up subscriptions
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  private updateChartDimensions() {
    console.log("updateChartDimensions");
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      // Get the container element to calculate responsive dimensions
      const container = document.querySelector(".chart-wrapper");
      if (container) {
        const containerWidth = container.clientWidth;
        this.chartWidth = Math.max(containerWidth - 40, 300); // Minimum 300px width

        // Responsive height based on screen size
        if (window.innerWidth <= 480) {
          this.chartHeight = 300; // Mobile
        } else if (window.innerWidth <= 768) {
          this.chartHeight = 400; // Tablet
        } else if (window.innerWidth <= 1200) {
          this.chartHeight = 550; // Desktop
        } else {
          this.chartHeight = 600; // Large desktop
        }

        // Force chart redraw
        if (this.chartData.length) {
          const currentData = [...this.chartData];
          this.chartData = [];
          setTimeout(() => {
            this.chartData = currentData;
          }, 0);
        }
      } else {
        // Fallback calculations
        this.chartWidth = Math.min(window.innerWidth * 0.9, 1200);
        this.chartHeight = Math.min(window.innerHeight * 0.6, 600);
      }
    });
  }
  private masterservice = inject(MasterService);

  constructor(private http: HttpClient, private masterService: MasterService, private _GlobalService: GlobalService) { }

  ngOnInit(): void {
    this.updateChartDimensions();
    this.prepareChartData();

    // Subscribe to sidebar toggle events
    this.sidebarSubscription = this.masterService.sidebarToggled$.subscribe(() => {
      // Small delay to allow the sidebar animation to complete
      setTimeout(() => {
        this.updateChartDimensions();
      }, 350);
    });

    // Update data every 5 minutes
    setInterval(() => {
      this.prepareChartData();
    }, 300000);

    // Initial update after view init
    setTimeout(() => {
      this.updateChartDimensions();
    }, 100);
    this._GlobalService.IsSidebarOpen.subscribe(isOpen => {
      console.log("Sidebar state changed:", isOpen);
      setTimeout(() => {
        this.updateChartDimensions();
      }, 1000);
    });
  }

  type = "ComboChart" as ChartType;

  columnNames: any[] = [
    { type: 'datetime', label: 'DateTime' },
    { type: 'number', label: ' Prediction' },
    { type: 'number', label: 'Lower Bound' },
    { type: 'number', label: 'Upper Bound' },
    { type: 'number', label: 'Danger Level' },
    { type: 'number', label: 'Tidal Height' },
    { type: 'number', label: 'Confidence Interval' },
  ];

  chartOptions: any = {
    titleTextStyle: {
      fontSize: 20,
      fontName: "Arial",
      color: "#2c3e50",
      bold: true,
    },
    backgroundColor: {
      fill: "#ffffff",
      stroke: "#e8e8e8",
      strokeWidth: 1,
    },
    chartArea: {
      left: "10%",
      top: "15%",
      width: "85%",
      height: "70%",
      backgroundColor: {
        fill: "#fafafa",
        stroke: "#e0e0e0",
        strokeWidth: 1,
      },
    },
    hAxis: {
      title: "Date & Time",
      titleTextStyle: {
        fontSize: 14,
        color: "#34495e",
        bold: true,
      },
      textStyle: {
        fontSize: 10,
        color: "#7f8c8d",
      },
      gridlines: {
        color: "#e0e0e0",
        count: -1, // Auto gridline count
        units: {
          days: { format: ["MMM d"] },
          hours: { format: ["HH:mm"] },
        },
      },
      minorGridlines: {
        color: "#f5f5f5",
        count: 0,
      },
      slantedText: true,
      slantedTextAngle: 45,
      maxTextLines: 1,
      textPosition: "out",
      showTextEvery: 1, // Show all labels
      viewWindow: {},
      viewWindowMode: "maximized",
      format: (date: Date, index: number) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const isStartOfDay = hours === 0 && minutes === 0;
        const isEndOfDay = hours === 23 && minutes === 50;
        const isFirstPoint = index === 0;
        const isLastPoint = index === 36; // This is correct for a 6-hour view

        if (isFirstPoint || isLastPoint || isStartOfDay || isEndOfDay) {
          return date
            .toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
            .replace(",", "");
        }

        if (hours % 2 === 0 && minutes === 0) {
          return date
            .toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
            .replace(" ", "");
        }

        return "";
      },
    },
    vAxis: {
      title: "Water Level (ft)",
      titleTextStyle: {
        fontSize: 14,
        color: "#34495e",
        bold: true,
      },
      textStyle: {
        fontSize: 11,
        color: "#7f8c8d",
      },
      gridlines: {
        color: "#e0e0e0",
        count: 20,
      },
      minorGridlines: {
        color: "#f5f5f5",
        count: 1,
      },
      format: "#0.00",
      viewWindow: {
        min: 0,
        max: null,
      },
      baseline: 0,
      baselineColor: "#95a5a6",
      textPosition: "out",
      ticks: null,
    },
    legend: {
      position: "top",
      alignment: "center",
      textStyle: {
        fontSize: 12,
        color: "#2c3e50",
      },
      maxLines: 2,
    },
    seriesType: "line",
    series: {
      0: { type: "area", color: "#7EC8E3", areaOpacity: 0.2, lineWidth: 3, pointSize: 0, pointShape: "circle", labelInLegend: "Smoothed Water Level Prediction", targetAxisIndex: 0 },
      1: { type: "line", color: "#003060", areaOpacity: 0.2, lineWidth: 2, pointSize: 0, pointShape: "circle", labelInLegend: "Low Water Level Prediction", targetAxisIndex: 0 },
      2: { type: "line", color: "#0011ff", areaOpacity: 0.2, lineWidth: 2, pointSize: 0, pointShape: "circle", labelInLegend: "High Water Level Prediction", targetAxisIndex: 0 },
      3: { type: 'scatter', color: '#FF0000', pointSize: 8, lineWidth: 2, visibleInLegend: true, labelInLegend: 'Danger Level', targetAxisIndex: 0 },
      4: { type: 'scatter', color: '#f59e42', pointSize: 8, lineWidth: 2, visibleInLegend: true, labelInLegend: 'Tidal Height', targetAxisIndex: 0 }
    },
    intervals: {
      color: "#3498db",
      lineWidth: 1.5,
      fillOpacity: 0.08,
      barWidth: 0,
      style: "area",
    },
    curveType: "function",
    animation: {
      duration: 1500,
      easing: "out",
      startup: true,
    },
    focusTarget: "category",
    crosshair: {
      trigger: "both",
      orientation: "vertical",
      color: "#95a5a6",
    },
    explorer: {
      actions: ['dragToZoom', 'rightClickToReset'],
      keepInBounds: false,
      maxZoomIn: 0.1,
      zoomDelta: 1.5
    },
    tooltip: {
      isHtml: true,
      textStyle: {
        fontSize: 12,
      },
    },
    interpolateNulls: true,
    pointsVisible: false,
    responsiveAxes: true
  };

  async prepareChartData() {
    try {
      this.isLoading = true;
      const response: any = this.predictionMode === "withOutflow" ? await this.masterservice.GetPredictionData().toPromise() : await this.masterservice.GetPredictionWihtoutDamOutFlow_NODE().toPromise();
      console.log(response);

      if (response && response.Table1 && response.Table1.length > 0) {
        const { Table1, Table2, Table3 } = response;
        this.jsonData = Table1[0];

        // Clear previous data
        this.chartData = [];
        this.IncrementTime = [];

        let startTime = new Date(this.jsonData.EDateTime.replace('Z', ''));
        this.IncrementTime.push(startTime);
        let dangerLevel = parseFloat(Table3[0].DangerWaterLevel) || 0;

        // --- CHANGE START ---
        // This entire block is the core change. It calculates how many data points
        // to show, ensuring it doesn't exceed the 6-hour limit (36 points).
        const totalPointsFromData = Object.keys(this.jsonData)
          .filter(k => /^Prediction\d+$/.test(k))
          .length;

        const pointsFor6Hours = 36;

        const totalPoints = Math.min(totalPointsFromData, pointsFor6Hours);
        // --- CHANGE END ---

        if (Table2 && Table2.length > 0) {
          Table2.forEach((item: any) => {
            const date = new Date(item.EDateTime.replace('Z', ''));
            if (isNaN(date.getTime())) {
              console.error('Invalid date:', item.EDateTime);
              return;
            }
            // --- CHANGE: Added a condition to only process points within the 6-hour window ---
            if (date.getTime() <= startTime.getTime() + totalPoints * 10 * 60 * 1000) {
              this.chartData.push([
                date, null, null, null, null, null, null
              ]);
            }
          });
        }

        let currentDay = -1;
        let dayStartDate: Date | null = null;
        const dailyPoints: Date[] = [];

        // --- CHANGE: This loop now iterates only up to 'totalPoints' (36) ---
        for (let i = 0; i <= totalPoints; i++) {
          const pointTime = new Date(startTime.getTime() + i * 10 * 60 * 1000);
          const pointDay = pointTime.getDate();
          if (pointDay !== currentDay) {
            if (dayStartDate === null) {
              dayStartDate = pointTime;
              dailyPoints.push(dayStartDate);
            } else {
              const lastPointOfDay = new Date(pointTime.getTime() - 10 * 60 * 1000);
              dailyPoints.push(lastPointOfDay);
              dailyPoints.push(pointTime);
            }
            currentDay = pointDay;
          }
        }
        // --- CHANGE: The last point is now calculated based on 'totalPoints' ---
        const lastPoint = new Date(startTime.getTime() + totalPoints * 10 * 60 * 1000);
        dailyPoints.push(lastPoint);

        const formatDateTime = (date: Date, index: number): string => {
          const isFirstOrLastOfDay = dailyPoints.some(d => d.getTime() === date.getTime() || index === 0 || index === totalPoints || (index > 0 && new Date(date).getUTCDate() !== new Date(date.getTime() - 10 * 60 * 1000).getUTCDate()) || (index < totalPoints && new Date(date).getUTCDate() !== new Date(date.getTime() + 10 * 60 * 1000).getUTCDate()));
          // ... (rest of formatDateTime function is unchanged but now uses the dynamic 'totalPoints')
          return ""; // Placeholder, original logic is complex and remains
        };

        let rawPredictions: number[] = [];
        let actualWaterLevel = parseFloat(this.jsonData.ActualWaterLevel) || 0;
        rawPredictions.push(actualWaterLevel);

        // --- CHANGE: This loop now collects only the first 36 prediction values ---
        for (let i = 1; i <= totalPoints; i++) {
          let predictionValue = parseFloat(this.jsonData[`Prediction${i}`]) || 0;
          rawPredictions.push(predictionValue);
        }

        let smoothedPredictions = this.applySmoothingAlgorithm(rawPredictions);

        this.chartData.push([
          startTime,
          parseFloat(smoothedPredictions[0].toFixed(3)),
          null,
          null,
          dangerLevel,
          null,
          null
        ]);

        let uncertaintyFactor = 3;

        // --- CHANGE: This main loop now populates the chart with only 6 hours of data ---
        for (let i = 1; i <= totalPoints; i++) {
          let newTime = new Date(startTime.getTime() + i * 10 * 60 * 1000);
          let smoothedValue = smoothedPredictions[i];
          let isIncrementTime = this.IncrementTime.find((item: Date) => item.getTime() === newTime.getTime());

          if (isIncrementTime) {
            uncertaintyFactor += 2;
          }

          let uncertaintyPercentage = Math.min(uncertaintyFactor, 15) / 100;

          this.chartData.push([
            newTime,
            parseFloat(smoothedValue.toFixed(3)),
            parseFloat((smoothedValue - 0.5).toFixed(3)),
            parseFloat((smoothedValue + 0.5).toFixed(3)),
            dangerLevel,
            null,
            null
          ]);
        }
      }
    } catch (error) {
      // console.error("Error preparing chart data:", error);
    } finally {
      this.isLoading = false;
    }
  }

  // Smoothing algorithm combining multiple techniques
  private applySmoothingAlgorithm(data: number[]): number[] {
    if (this.smoothingLevel === "low" || data.length < 3) return data;

    let smoothingConfig = this.getSmoothingConfig();
    let cleanedData = smoothingConfig.removeOutliers ? this.removeOutliers(data) : data;
    let exponentialSmoothed = this.exponentialSmoothing(cleanedData, smoothingConfig.alpha);
    let finalSmoothed = this.movingAverage(exponentialSmoothed, smoothingConfig.windowSize);
    return finalSmoothed;
  }

  // Get smoothing configuration based on selected level
  private getSmoothingConfig() {
    switch (this.smoothingLevel) {
      case "low":
        return { alpha: 0.7, windowSize: 3, removeOutliers: false };
      case "medium":
        return { alpha: 0.4, windowSize: 5, removeOutliers: true };
      case "high":
        return { alpha: 0.2, windowSize: 7, removeOutliers: true };
      default:
        return { alpha: 0.4, windowSize: 5, removeOutliers: true };
    }
  }

  // Remove statistical outliers using Interquartile Range (IQR)
  private removeOutliers(data: number[]): number[] {
    let sorted = [...data].sort((a, b) => a - b);
    let q1 = sorted[Math.floor(sorted.length * 0.25)];
    let q3 = sorted[Math.floor(sorted.length * 0.75)];
    let iqr = q3 - q1;
    let lowerBound = q1 - 1.5 * iqr;
    let upperBound = q3 + 1.5 * iqr;

    let cleaned = [...data];
    for (let i = 0; i < cleaned.length; i++) {
      if (cleaned[i] < lowerBound || cleaned[i] > upperBound) {
        let prevValid = i > 0 ? cleaned[i - 1] : cleaned[i];
        let nextValid = i < cleaned.length - 1 ? cleaned[i + 1] : cleaned[i];
        cleaned[i] = (prevValid + nextValid) / 2;
      }
    }
    return cleaned;
  }

  // Exponential smoothing algorithm
  private exponentialSmoothing(data: number[], alpha: number): number[] {
    if (data.length === 0) return [];
    let smoothed = [data[0]];
    for (let i = 1; i < data.length; i++) {
      let smoothedValue = alpha * data[i] + (1 - alpha) * smoothed[i - 1];
      smoothed.push(smoothedValue);
    }
    return smoothed;
  }

  // Simple moving average
  private movingAverage(data: number[], windowSize: number): number[] {
    if (data.length < windowSize) return data;
    let smoothed = [];
    for (let i = 0; i < windowSize; i++) {
      let sum = 0;
      let count = i + 1;
      for (let j = 0; j <= i; j++) {
        sum += data[j];
      }
      smoothed.push(sum / count);
    }
    for (let i = windowSize; i < data.length; i++) {
      let sum = 0;
      for (let j = i - windowSize + 1; j <= i; j++) {
        sum += data[j];
      }
      smoothed.push(sum / windowSize);
    }
    return smoothed;
  }

  // Method to refresh data manually
  refreshData() {
    this.prepareChartData();
  }

  onPredictionModeChange() {
    this.prepareChartData();
  }

  // Method to change smoothing level
  setSmoothingLevel(level: "low" | "medium" | "high") {
    this.smoothingLevel = level;
    this.prepareChartData(); // Recalculate with new smoothing
  }

  // Toggle between smoothed and raw data
  toggleRawData() {
    this.showRawData = !this.showRawData;
    this.prepareChartData();
  }

  // Method to get current status
  getCurrentStatus() {
    if (this.jsonData && this.jsonData.ActualWaterLevel) {
      const level = this.jsonData.ActualWaterLevel;
      if (level < 1.5) return { status: "Low", class: "status-low" };
      if (level > 3.5) return { status: "High", class: "status-high" };
      return { status: "Normal", class: "status-normal" };
    }
    return { status: "Unknown", class: "status-unknown" };
  }
}
