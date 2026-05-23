import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MasterService, GlobalService } from '../_services';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-prediction-tidalchart',
  templateUrl: './prediction-tidalchart.component.html',
  styleUrls: ['./prediction-tidalchart.component.scss']
})
export class PredictionTidalchartComponent implements OnInit, OnDestroy {

  private sidebarSubscription: Subscription | undefined;
  chartWidth: number = 0; // Will be calculated dynamically
  chartHeight: number = 0; // Will be calculated dynamically
  chartData: any[] = [];
  ngOnDestroy() {
    // Clean up subscriptions
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }


  private updateChartDimensions() {
    console.log("updateChartDimensions"); 
    requestAnimationFrame(() => {
      const container = document.querySelector(".chart-container");
      if (container) {
        const containerWidth = container.clientWidth;
        
        // Reduce the width by using a smaller percentage of the container
        this.chartWidth = Math.max(containerWidth * 0.8, 300); // 80% of container width or min 300px
        
        // Keep the existing height calculations
        if (window.innerWidth <= 480) {
          this.chartHeight = 300;
        } else if (window.innerWidth <= 768) {
          this.chartHeight = 400;
        } else if (window.innerWidth <= 1200) {
          this.chartHeight = 550;
        } else {
          this.chartHeight = 600;
        }
        
        // Update the chart's width in the options
        if (this.chart && this.chart.options) {
          this.chart = {
            ...this.chart,
            width: `${this.chartWidth}px`,
            height: `${this.chartHeight}px`,
            options: {
              ...this.chart.options,
              chartArea: {
                ...this.chart.options.chartArea,
                width: '90%',  // Use more of the available width
                left: '8%',    // Center the chart
                right: '5%'    // Add some padding on the right
              }
            }
          };
        }
        
        // Force chart redraw
        if (this.chartData.length) {
          const currentData = [...this.chartData];
          this.chartData = [];
          setTimeout(() => {
            this.chartData = currentData;
          }, 0);
        }
      }
    });
  }
  
  chart: any = {
    title: 'Prediction vs Tidal Height',
    type: 'ComboChart',
    data: [] as any[],
    columnNames: ['Time', 'Prediction', 'Tidal Height'],
    options: {
     hAxis: {
  title: 'Date & Time',
  format: 'dd MMM, HH:mm',  // Using the long date and time format
  // slantedText: true,
  slantedTextAngle: 45,
  showTextEvery: 1,
  textStyle: {
    fontSize: 11
  },
        gridlines: {
          count: 24,
          color: '#f0f0f0',
          units: {
            days: { format: ['MMM d, yyyy'] },
            hours: { format: ['ha', 'HH:mm'] },
            minutes: { format: ['HH:mm', ':mm'] }
          }
        },
        minorGridlines: {
          units: {
            hours: { format: ['hh:mm:ss a', 'ha'] },
            minutes: { format: ['HH:mm a Z', ':mm'] }
          }
        }
      },
      vAxis: {
        title: 'Height (m)',
        titleTextStyle: {
          italic: false
        }
      },
      seriesType: 'line',
      series: {
        0: { 
          type: 'line', 
          color: '#4285F4',
          lineWidth: 2,
          pointSize: 0,
          visibleInLegend: true,
          labelInLegend: 'Prediction'
        },
        1: { 
          type: 'line', 
          color: '#EA4335', 
          lineWidth: 2,  // Slightly thicker line
          pointSize: 6,  // Point size
          visibleInLegend: true,
          labelInLegend: 'Tidal Height',
          pointsVisible: true,  // Show points
          lineDashStyle: []  // Solid line (empty array means solid)
        }
      },
      legend: { 
        position: 'top',
        alignment: 'center'
      },
      tooltip: { 
        isHtml: true,
        trigger: 'both'
      },
      focusTarget: 'category',
      chartArea: { 
        width: '90%', 
        height: '75%',
        left: 60,
        right: 20,
        top: 50,
        bottom: 50
      },
      pointSize: 4,
      lineWidth: 2,
      animation: {
        startup: true,
        duration: 1000,
        easing: 'out'
      },
      backgroundColor: 'transparent',
      isStacked: false
    },
    dynamicResize: true
  };

  constructor(private masterService: MasterService , private _GlobalService: GlobalService) {}

  ngOnInit(): void {
    this.predictionTidalchart();
    this.sidebarSubscription = this.masterService.sidebarToggled$.subscribe(() => {
      // Small delay to allow the sidebar animation to complete
      setTimeout(() => {
        this.updateChartDimensions();
      }, 350);
    });

    // Update data every 5 minutes
    setInterval(() => {
      this.predictionTidalchart();
    }, 300000);

    // Initial update after view init
    setTimeout(() => {
      this.updateChartDimensions();
    }, 100);
    this._GlobalService.IsSidebarOpen.subscribe((isOpen) => {
      console.log("Sidebar state changed:", isOpen);
      setTimeout(() => {
        
        this.updateChartDimensions();
      }, 1000);
    });
  }

  @HostListener("window:resize", ["$event"])
    onResize() {
      this.updateChartDimensions();
    }
  

  predictionTidalchart() {
    this.masterService.GetPredictionData().subscribe((res: any) => {
      const table1 = res.Table1[0];
      const table2 = res.Table2;
      console.log(table1);
      console.log(table2);

      const chartData: any[] = [];
      const now = new Date();
      
      // Set the start time to the beginning of the current hour
      now.setMinutes(0, 0, 0);
      
      // Generate time labels with full date and time (10-minute intervals for 24 hours = 144 points)
      const timeLabels: Date[] = [];
      for (let i = 0; i < 144; i++) {
        const date = new Date(now);
        date.setMinutes(date.getMinutes() + i * 10);
        timeLabels.push(date);
      }
      
      // Set the view window to show a full 24-hour range
      this.chart.options.hAxis.viewWindow = {
        min: timeLabels[0],
        max: timeLabels[timeLabels.length - 1]
      };

      // Add Prediction values (hourly)
      for (let i = 0; i < 144; i++) {
        const prediction = table1[`Prediction${i + 1}`];
        chartData.push([timeLabels[i], prediction, null]);
      }

      // Add Tidal values
      table2.forEach((tidal: any, idx: number) => {
        // Distribute tidal data points evenly across the time period
        const position = Math.min(Math.floor(idx * (144 / table2.length)), 143);
        if (chartData[position]) {
          chartData[position][2] = tidal.Height_MTR;
        }
      });

      // Remove any null tidal values at the end if needed
      this.chart.data = chartData.filter(row => row[1] !== null || row[2] !== null);
    });
  }

}