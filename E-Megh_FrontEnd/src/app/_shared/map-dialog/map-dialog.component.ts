import { AgmMap, MapsAPILoader, AgmMapTypeControl } from "@agm/core";
import { Component, Inject, NgZone, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-map-dialog",
  templateUrl: "./map-dialog.component.html",
  styleUrls: ["./map-dialog.component.scss"],
})
export class MapDialogComponent implements OnInit, OnDestroy {
  constructor(public mapsApiLoader: MapsAPILoader, private dialogRef: MatDialogRef<MapDialogComponent>, private zone: NgZone, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.IsDashboard = data.IsDashboard;
      this.DialogData = data["arrayForDialog"];
      this.latlongdata = data["arrayForDialog"];       
    }    
  }

  ngOnInit() {
    this.findMe();
  }

  // #region variable
  DialogData: any[] = [];
  mapTypeControlOptions?: AgmMapTypeControl;
  lat: number = 0;
  lng: number = 0;
  latlongdata:any; 
  ReservoirMapData:any;
  Altitude: number = 0;
  IsDashboard: boolean = false;
  @ViewChild(AgmMap) map!: AgmMap;
  _MapStyle = [
    {
      stylers: [
        {
          hue: "#007fff",
        },
        {
          saturation: 70,
        },
      ],
    },
    {
      featureType: "water",
      stylers: [
        {
          color: "#1a73e8",
        },
        {
          saturation: 70,
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];
  geocoder: any;
  location = {
    lat: 21.703369345524255,
    lng: 72.9995584487915,
    altitude: 0,
    marker: {
      lat: 21.703369345524255,
      lng: 72.9995584487915,
      draggable: false,
    },
    zoom: 11,
  };

  address: string = "";
  clickEventHandler: any;
  markers: Marker[] = [];
  IconUrl: string = "";
  SizeScale: google.maps.Size = {
    width: 40,
    height: 40,
    equals: () => true,
  };
  // #endregion

  findMe() {
    const alertSVGIcon =
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

    const alertSIRENIcon =
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
    if (this.IsDashboard) {
      console.log(this.DialogData);
      this.DialogData.map((item: any) => {
        this.location.lat = item.LATITUDE;
        this.location.lng = item.LONGITUDE;
        this.markers = [];
        this.DialogData.forEach((item: any) => {
          if (item.TYPE === "READLOCATION") {
            this.IconUrl = alertSVGIcon;
          } else if (item.TYPE === "SIRENLOCATION") {
            this.IconUrl = alertSIRENIcon;
          } else {
            if (item.cStatus === "WHITE") {
              this.IconUrl = "http://maps.google.com/mapfiles/kml/paddle/wht-circle.png";
            }
            if (item.cStatus === "YELLOW") {
              this.IconUrl = "http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png";
            }
            if (item.cStatus === "RED") {
              this.IconUrl = "http://maps.google.com/mapfiles/kml/paddle/red-circle.png";
            }
          }
          this.lat = item.LATITUDE;
          this.lng = item.LONGITUDE;

          this.markers.push({
            lat: this.lat,
            lng: this.lng,
            dragable: true,
            Icon: this.IconUrl,
            Type: item.TYPE,
            Name: item.NAME,
            YELLOW_MIN: item.YELLOW_MIN,
            RED_MIN: item.RED_MIN,
            WHITE_MIN: item.WHITE_MIN,
          });
        });
      });
    } else {
      console.log(this.latlongdata);
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          console.log(this.latlongdata);
          
          this.lat = this.latlongdata.Latitude; 
          this.lng = this.latlongdata.Longitude;
          console.log(this.lat);
          console.log(this.lng);
          
          // this.lng = this.ReadingLocationMapData.Longitude;
          // this.lat = this.ReadingLocationMapData.Latitude;
  
          // // this.lng = this.ReservoirMapData.ReservoirLongitude;
          // // this.lat = this.ReservoirMapData.ReservoirLatitude;
          this.location.marker.draggable = false;
          this.location.marker.lat = this.lat;
          this.location.marker.lng = this.lng;

          // ✅ Ensure map centers to this marker
          this.location.lat = this.lat;
          this.location.lng = this.lng;
          this.findAddressByCoordinates();
          
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  }

  onMapReady(map: google.maps.Map) {
    this.clickEventHandler = map.addListener("click", (m: google.maps.MouseEvent) => {
      this.zone.run(() => {
        // Here we can get correct event
        this.location.marker.lat = m.latLng.lat();
        this.location.marker.lng = m.latLng.lng();
        this.location.lat = m.latLng.lat();
        this.location.lng = m.latLng.lng();
        // this._Long = this.location.lat;
        // this._Lat = this.location.lng;
        this.findAddressByCoordinates();
      });
    });
  }

  // findAddressByCoordinates() {
  //   let geocoder = new google.maps.Geocoder();
  //   geocoder!.geocode(
  //     {
  //       location: {
  //         lat: this.location.marker.lat,
  //         lng: this.location.marker.lng,
  //       },
  //     },
  //     (results: any, status: any) => {
  //       this.decomposeAddressComponents(results);
  //       const elevationService = new google.maps.ElevationService();
  //       const locations = [{ lat: this.location.marker.lat, lng: this.location.marker.lng }];

  //       elevationService.getElevationForLocations(
  //         {
  //           locations: [{ lat: this.location.marker.lat, lng: this.location.marker.lng }]
  //         },
  //         (results, status) => {
  //           if (status === google.maps.ElevationStatus.OK) {
  //             if (results[0]) {
  //               const altitude = results[0].elevation;
  //               console.log(altitude);

  //               this.location.altitude = altitude; // Store altitude in location object
  //             } else {
  //               console.log("No results found");
  //             }
  //           } else {
  //             console.log("Elevation service failed due to: " + status);
  //           }
  //         }
  //       );
  //       this.map.triggerResize(true);
  //     }
  //   );
  // }

  // TypeScript code
  findAddressByCoordinates() {
    let geocoder = new google.maps.Geocoder(); 
    geocoder!.geocode(
      {
        location: {
          lat: this.location.marker.lat,
          lng: this.location.marker.lng,
        },
      },
      (results: any, status: any) => {
        this.decomposeAddressComponents(results);

        // Get altitude using Google Maps Elevation API
        const elevationService = new google.maps.ElevationService();
        const locations = [{ lat: this.location.marker.lat, lng: this.location.marker.lng }];
        const request = {
          locations: locations,
        };

        elevationService.getElevationForLocations(request, (results, status) => {
          if (status === google.maps.ElevationStatus.OK) {
            if (results[0]) {
              const altitude = results[0].elevation;
              this.Altitude = altitude; // Update the Altitude property
            } else {
              console.log("No results found");
            }
          } else {
            console.log("Elevation service failed due to: " + status);
          }
        });

        this.map.triggerResize(true);
      }
    );
  }

  decomposeAddressComponents(addressArray: any) {
    this.address = "";
    if (!addressArray?.length) return;
    this.address = addressArray[0]?.formatted_address;
  }

  onClose() {
    this.dialogRef.close({
      address: this.address,
      lat: this.location.lat,
      lng: this.location.lng,
      altitude: this.Altitude,
    });
  }

  OnMouseOver(infoWindow: any) {
    infoWindow.open();
  }

  OnMouseOut(infoWindow: any) {
    infoWindow.close();
  }

  ngOnDestroy(): void {
    this.clickEventHandler?.remove();
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
}

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
