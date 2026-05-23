import { HttpClient } from "@angular/common/http";
import { Component, HostListener, inject, OnDestroy, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { GlobalService, MasterService } from "../_services";
import { ChartType } from "angular-google-charts";
import { Subscription } from "rxjs";

@Component({
  selector: "app-affected-village-chart",
  templateUrl: "./affected-village-chart.component.html",
  styleUrls: ["./affected-village-chart.component.scss"],
})
export class AffectedVillageChartComponent implements OnInit, OnDestroy, AfterViewInit {
  // Helper function to escape HTML in tooltips
  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private sidebarSubscription: Subscription | undefined;
  waterLevel: number = 2; // Default value
  outflow: number = 180000; // Default value
  jsonData: any;
  chartData: any[] = [];
  chartData2: any[] = [];
  IncrementTime: any[] = [];
  chartWidth: number = 0; // Will be calculated dynamically
  chartHeight: number = 0; // Will be calculated dynamically
  isLoading: boolean = true;
  ReadingLocationID: number = 4;
  chart: google.visualization.ComboChart | null = null;
  columnNames: any[] = [
    { type: 'datetime', label: 'DateTime' },
    { type: 'number', label: 'Predicted Water Level' },
    { type: 'number', label: '-3% Range' },
    { type: 'number', label: '+3% Range' },
    { type: 'string', role: 'tooltip' }
  ];

  // Smoothing configuration
  smoothingLevel: "low" | "medium" | "high" = "low";
  showRawData: boolean = false;
  affectedVillages: Array<{ name: string, status: 'yellow' | 'red' }> = [];;

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.updateChartDimensions();
  }

  ngAfterViewInit(): void {
    // View initialization logic can go here if needed
  }

  ngOnDestroy(): void {
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
    this.prepareChartData(this.ReadingLocationID);

    // Subscribe to sidebar toggle events
    // this.sidebarSubscription = this.masterService.sidebarToggled$.subscribe(() => {
    //   // Small delay to allow the sidebar animation to complete
    //   setTimeout(() => {
    //     this.updateChartDimensions();
    //   }, 350);
    // });

    // Update data every 5 minutes
    setInterval(() => {
      this.prepareChartData(this.ReadingLocationID);
    }, 300000);

    this._GlobalService.IsSidebarOpen.subscribe((isOpen) => {
      console.log("Sidebar state changed:", isOpen);
      setTimeout(() => {

        this.updateChartDimensions();
      }, 1000);
    });

  }

  type = "ComboChart" as ChartType;

  chartOptions: any = {
    // title: "Golden Bridge Affected Village Prediction",
    titleTextStyle: {
      fontSize: 20,
      fontName: "Arial",
      color: "#2c3e50",
      bold: true,
    },

    backgroundColor: {
      fill: "#ffffff",
      stroke: "#e8e8e8",
      strokeWidth: 2,
    },
    chartArea: {
      left: "15%",  // Increased from 10% to give more space for tooltips on the left
      right: "5%",  // Added right margin to balance the chart
      top: "15%",
      width: "80%",  // Adjusted width to accommodate the new margins
      height: "60%",
      backgroundColor: {
        fill: "#fafafa",
        stroke: "#e0e0e0",
        strokeWidth: 1,
      },
    },
    // columns: removed as we'll use [columns] input in HTML
    hAxis: {
      title: "Date & Time",
      titleTextStyle: { fontSize: 14, color: "#34495e", bold: true },
      textStyle: { fontSize: 11, color: "#7f8c8d" },
      gridlines: {
        color: "#e0e0e0",
        count: 12, // Show more gridlines for better visibility
      },
      minorGridlines: { color: "#f5f5f5", count: 1 },
      slantedText: true,
      slantedTextAngle: 45,
      maxTextLines: 1,
      textPosition: "out",
      showTextEvery: 1,
      format: "MMM dd, HH:mm"
    },
    vAxis: {
      title: "Water Level (feet)",
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
        count: -1,
      },
      minorGridlines: {
        color: "#f5f5f5",
        count: 1,
      },
      format: "#0",
      viewWindow: {
        min: 0,
        max: null,
      },
      baseline: 0,
      baselineColor: "#95a5a6",
      textPosition: "out",
    },
    legend: {
      position: "top",
      alignment: "center",
      textStyle: {
        fontSize: 14,  // Increased from 8 to 12 for better readability
        color: "#2c3e50",
        fontName: "'Lexend Deca', 'sans-serif'",
        bold: true
      },
      maxLines: 1,
    },
    seriesType: "line",
    series: {
      0: {
        type: "area",
        color: "#7EC8E3",
        areaOpacity: 0.2,
        lineWidth: 3,
        pointSize: 0,
        pointShape: 'circle',
        labelInLegend: "Predicted Water Level",
      },
      1: {
        type: "line",
        color: "#003060",
        areaOpacity: 0.2,
        lineWidth: 3,
        pointSize: 0,
        pointShape: "circle",
        labelInLegend: "-3% Range",
        tooltip: { trigger: 'none' },
        enableInteractivity: false,  // Disable interactivity for this series
      },
      2: {
        type: "line",
        color: "#FF0000",
        areaOpacity: 0.2,
        lineWidth: 3,
        pointSize: 0,
        pointShape: "circle",
        labelInLegend: "+3% Range",
        tooltip: { trigger: 'none' },
        enableInteractivity: false,  // Disable interactivity for this series
      },
      3: {
        type: "line",
        color: "#000000",
        areaOpacity: 0.2,
        lineWidth: 0,
        pointSize: 0,
        pointShape: "circle",
        labelInLegend: "",
      },
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
      actions: [],
      keepInBounds: true,
    },
    tooltip: {
      trigger: 'focus',
      isHtml: false,
      ignoreBounds: true,
      showColorCode: false,
      textStyle: {
        fontSize: 13,
        fontName: 'Arial, sans-serif',
        color: '#2c3e50',
        bold: true
      },
      position: 'top',
      placement: 'auto',
      chartArea: {
        left: '15%',
        right: '5%',
        top: '15%',
        width: '80%',
        height: '70%',
      },
      showTitle: true,
      titleTextStyle: {
        color: '#2c3e50',
        fontSize: 14,
        bold: true,
        marginBottom: '8px',
        fontFamily: 'Arial, sans-serif'
      },
      animation: {
        duration: 200,
        easing: 'out',
        startup: true
      },
      focusTarget: 'category',
      selectionMode: 'single',
      // Custom formatter to hide tooltips for series 1 and 2
      format: (data: any, dataIndex: number, seriesIndex: number) => {
        // Only show tooltip for the main series (index 0)
        if (seriesIndex === 0) {
          return data[1];
        }
        return null; // Hide tooltip for other series
      }
    },
    enableInteractivity: true,
    interpolateNulls: true,
    pointsVisible: false,
    responsiveAxes: true,
  };

  async prepareChartData(ReadingLocationID: number) {
    try {
      this.isLoading = true;
      const response: any = await this.masterservice.GetPredictionDataWithVillages(ReadingLocationID).toPromise();

      if (response) {
        let tableData = Array.isArray(response) ? response : (response.Table || []);
        if (tableData.length === 0) return;

        this.jsonData = tableData[0];

        // Clear previous data
        this.chartData = [];

        let startTime = new Date(this.jsonData.EDateTime);
        if (isNaN(startTime.getTime()) && this.jsonData.EDateTime) {
          // Fallback parsing for non-standard formats
          startTime = new Date(this.jsonData.EDateTime.replace(' ', 'T'));
        }

        // Exact count of prediction fields from your JSON (Prediction1 to Prediction144)
        const predictionPoints = Object.keys(this.jsonData)
          .filter(k => /^Prediction\d+$/.test(k))
          .length;

        const formatTooltipTime = (date: Date): string => {
          return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        };

        let rawPredictions: number[] = [];
        let actualWaterLevel = parseFloat(this.jsonData.ActualWaterLevel) || 0;
        rawPredictions.push(actualWaterLevel);

        for (let i = 1; i <= predictionPoints; i++) {
          rawPredictions.push(parseFloat(this.jsonData[`Prediction${i}`]) || 0);
        }

        let smoothedPredictions = this.applySmoothingAlgorithm(rawPredictions);

        for (let i = 0; i <= predictionPoints; i++) {
          let currentPointTime = new Date(startTime.getTime() + i * 10 * 60 * 1000);
          let val = smoothedPredictions[i];

          const highValue = val * 1.03;
          const lowValue = val * 0.97;

          const hasYellowAlert = i > 0 && this.jsonData[`Prediction${i}_YellowAlerts`] != null;
          const hasRedAlert = i > 0 && this.jsonData[`Prediction${i}_RedAlerts`] != null;

          let tooltipLines = [
            `🕒 ${formatTooltipTime(currentPointTime)}`,
            `💧 Level: ${val.toFixed(2)} ft`,
            `🔻 -3% Range: ${lowValue.toFixed(2)} ft`,
            `🔼 +3% Range: ${highValue.toFixed(2)} ft`
          ];

          if (hasYellowAlert || hasRedAlert) {
            tooltipLines.push('');
            if (hasYellowAlert) {
              const alerts = String(this.jsonData[`Prediction${i}_YellowAlerts`]).split(',').map(a => a.trim());
              tooltipLines.push(`⚠️ Yellow Alerts (${alerts.length}):`);
              alerts.forEach(a => tooltipLines.push(`  • ${a}`));
            }
            if (hasRedAlert) {
              const alerts = String(this.jsonData[`Prediction${i}_RedAlerts`]).split(',').map(a => a.trim());
              tooltipLines.push(`🚨 Red Alerts (${alerts.length}):`);
              alerts.forEach(a => tooltipLines.push(`  • ${a}`));
            }
          }

          this.chartData.push([
            currentPointTime,
            parseFloat(val.toFixed(3)),
            parseFloat(lowValue.toFixed(3)),
            parseFloat(highValue.toFixed(3)),
            tooltipLines.join('\n')
          ]);
        }
      }
    } catch (error) {
      console.error("Error preparing chart data:", error);
    } finally {
      this.isLoading = false;
    }
  }

  // Smoothing algorithm combining multiple techniques
  private applySmoothingAlgorithm(data: number[]): number[] {
    if (this.smoothingLevel === "low" || data.length < 3) return data;

    let smoothingConfig = this.getSmoothingConfig();

    // Step 1: Remove extreme outliers using IQR method (if enabled)
    let cleanedData = smoothingConfig.removeOutliers ? this.removeOutliers(data) : data;

    // Step 2: Apply exponential smoothing
    let exponentialSmoothed = this.exponentialSmoothing(cleanedData, smoothingConfig.alpha);

    // Step 3: Apply moving average for additional smoothing
    let finalSmoothed = this.movingAverage(exponentialSmoothed, smoothingConfig.windowSize);
    return finalSmoothed;
  }

  // Get smoothing configuration based on selected level
  private getSmoothingConfig() {
    switch (this.smoothingLevel) {
      case "low":
        return {
          alpha: 0.7, // Less smoothing, more responsive
          windowSize: 3, // Smaller window
          removeOutliers: false, // Keep original data
        };
      case "medium":
        return {
          alpha: 0.4, // Moderate smoothing
          windowSize: 5, // Medium window
          removeOutliers: true, // Remove extreme outliers
        };
      case "high":
        return {
          alpha: 0.2, // Heavy smoothing
          windowSize: 7, // Larger window
          removeOutliers: true, // Remove extreme outliers
        };
      default:
        return {
          alpha: 0.4,
          windowSize: 5,
          removeOutliers: true,
        };
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

    // Replace outliers with interpolated values
    let cleaned = [...data];
    for (let i = 0; i < cleaned.length; i++) {
      if (cleaned[i] < lowerBound || cleaned[i] > upperBound) {
        // Interpolate between previous and next valid values
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

    // For the first few points, use expanding window
    for (let i = 0; i < windowSize; i++) {
      let sum = 0;
      let count = i + 1;
      for (let j = 0; j <= i; j++) {
        sum += data[j];
      }
      smoothed.push(sum / count);
    }

    // For the rest, use sliding window
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
    this.prepareChartData(this.ReadingLocationID);
  }

  // Method to change smoothing level
  setSmoothingLevel(level: "low" | "medium" | "high") {
    this.smoothingLevel = level;
    this.prepareChartData(this.ReadingLocationID); // Recalculate with new smoothing
  }

  // Toggle between smoothed and raw data
  toggleRawData() {
    this.showRawData = !this.showRawData;
    this.prepareChartData(this.ReadingLocationID);
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
