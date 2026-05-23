import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '@source/app/_services';
import { GlobalService } from '@source/app/_services';
import { MatDialog } from '@angular/material/dialog';
import { UnSubscriber } from '@source/app/_shared/UnSubscriber';

@Component({
  selector: 'app-guest-user',
  templateUrl: './guest-user.component.html',
  styleUrls: ['./guest-user.component.scss']
})
export class GuestUserComponent  extends UnSubscriber implements OnInit {
  constructor(
    private _MasterService: MasterService, 
    private _GlobalService: GlobalService, 
    private dialog: MatDialog,
    private router: Router
  ) {
    super();
  }

  SensorStatus: any[] = [];
  ngOnInit() {
    this.GetSensorData();
  }
  
  GetSensorData() {
    this.anotherSubscription = this._MasterService.GetDashboardSensorData().subscribe((res: any) => {
      console.log(res);

      // Filter to only include GOLDEN BRIDGE
      this.SensorStatus = JSON.parse(JSON.stringify(res["Table"])).filter(
        (item: any) => item.Name && item.Name.trim().toUpperCase() === 'GOLDEN BRIDGE'
      );
      
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

      console.log(this.SensorStatus);
    });
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

  getWaterLevel(readingFT: number): string {
    const maxLevel = 100;
    const level = Math.min(readingFT || 0, maxLevel);
    const percentage = (level / maxLevel) * 100;
    return `${percentage}%`;
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

}
