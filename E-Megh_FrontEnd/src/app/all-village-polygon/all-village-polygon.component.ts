import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

declare const google: any;
interface Tile {
  sw: google.maps.LatLng;
  ne: google.maps.LatLng;
  center: google.maps.LatLng;
  elevation: number | null; // not optional
}
@Component({
  selector: "app-all-village-polygon",
  templateUrl: "./all-village-polygon.component.html",
  styleUrls: ["./all-village-polygon.component.scss"],
})
export class AllVillagePolygonComponent implements OnInit {
  @ViewChild("mapContainer", { static: true }) mapElement!: ElementRef;

  googleMap!: google.maps.Map;

  center = new google.maps.LatLng(21.7126, 73.0033);
  zoom = 16;
  enteredElevation: number | null = null;
  simpleMapStyle: google.maps.MapTypeStyle[] = [
    // General label styles
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#004080" }, { visibility: "on" }],
    },
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [{ color: "#338ae2" }, { visibility: "on" }],
    },

    // Road label strokes (make road names white-ish)
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#dceefd" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#dceefd" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#dceefd" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#dceefd" }],
    },

    // Road geometry (fill colors)
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#60a6ec" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#a6cef4" }],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ color: "#c8e0f8" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#60a6ed" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#a0c4e3" }],
    },

    // Natural features
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#1898fd" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#dceefd" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#b3d9ff" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#b3d9ff" }],
    },

    // Hide administrative boundaries
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text",
      stylers: [{ visibility: "off" }],
    },
  ];
  private generatedTiles: Tile[] = [];
  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: this.zoom,
    //  styles: this.simpleMapStyle,
    clickableIcons: false,
    disableDefaultUI: true,
  };

  baseGradientColor: "red" | "green" | "blue" = "red";
  tilePolygons: google.maps.Polygon[] = [];
  tileLabels: google.maps.Marker[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadGoogleMapsScript().then(() => {
      this.initMap();
      this.loadAllTiles();
    });
  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise(resolve => {
      if ((window as any).google?.maps) resolve();
      else {
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDKkTUTjRm_thX3Na21dLdt4vbIKslMKM0";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      }
    });
  }

  initMap() {
    this.googleMap = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
    this.googleMap.addListener("zoom_changed", () => {
      const currentZoom = this.googleMap.getZoom() ?? 0;

      this.tileLabels.forEach(marker => {
        marker.setMap(currentZoom >= 16 ? this.googleMap : null);
      });
    });
  }

  loadAllTiles1() {
    this.http.get("http://localhost:5000/api/MasterController/GetVillagePolygonWithPointsAndTiles?VillageId=0").subscribe((res: any) => {
      const data = res?.Table;
      if (!data?.length) return;

      const allTiles = data.flatMap((village: any) => {
        const tilesRaw = JSON.parse(village.Tiles || "[]");
        return tilesRaw.map((tile: any) => {
          const center = new google.maps.LatLng(tile.Center_Latitude, tile.Center_Longitude);

          const tileHeight = 0.001; // Adjust as needed
          const tileWidth = 0.001;

          const sw = tile.SW_Latitude && tile.SW_Longitude ? new google.maps.LatLng(tile.SW_Latitude, tile.SW_Longitude) : new google.maps.LatLng(center.lat() - tileHeight / 2, center.lng() - tileWidth / 2);

          const ne = tile.NE_Latitude && tile.NE_Longitude ? new google.maps.LatLng(tile.NE_Latitude, tile.NE_Longitude) : new google.maps.LatLng(center.lat() + tileHeight / 2, center.lng() + tileWidth / 2);

          return { sw, ne, center, elevation: tile.Elevation };
        });
      });
      this.generatedTiles = allTiles;
      this.colorAndLabelTiles(allTiles, this.googleMap);
    });
  }

  loadAllTiles() {
    this.http.get("http://localhost:5000/api/MasterController/GetVillagePolygonWithPointsAndTiles?VillageId=0").subscribe((res: any) => {
      const data = res?.Table;
      if (!data?.length) return;

      const allTiles = data.flatMap((village: any) => {
        const tilesRaw = JSON.parse(village.TilesJson || "[]"); // Use TilesJson instead of Tiles

        return tilesRaw.map((tile: any) => {
          const center = new google.maps.LatLng(tile.Center_Latitude, tile.Center_Longitude);

          const tileHeight = 0.001; // Adjust as needed
          const tileWidth = 0.001;

          const sw = new google.maps.LatLng(center.lat() - tileHeight / 2, center.lng() - tileWidth / 2);
          const ne = new google.maps.LatLng(center.lat() + tileHeight / 2, center.lng() + tileWidth / 2);

          return { sw, ne, center, elevation: tile.Elevation };
        });
      });

      this.generatedTiles = allTiles;
      this.colorAndLabelTiles(allTiles, this.googleMap);
    });
  }

  private colorAndLabelTiles(tiles: { sw: any; ne: any; center: google.maps.LatLng; elevation?: number | null }[], map: google.maps.Map) {
    const elevations = tiles.map(t => t.elevation).filter((e): e is number => e !== null && e !== undefined);
    const minElevation = Math.min(...elevations);
    const maxElevation = Math.max(...elevations);

    const stepLat = 100 / 111320;
    const stepLng = 100 / (111320 * Math.cos((tiles[0].center.lat() * Math.PI) / 180));
    const latOffset = stepLat / 2;
    const lngOffset = stepLng / 2;

    tiles.forEach(tile => {
      const ratio = tile.elevation != null && minElevation !== maxElevation ? (tile.elevation - maxElevation) / (minElevation - maxElevation) : 0;

      const fillColor = this.getGradientColor(this.baseGradientColor, ratio);

      const tileCoords = [new google.maps.LatLng(tile.center.lat() - latOffset, tile.center.lng() - lngOffset), new google.maps.LatLng(tile.center.lat() - latOffset, tile.center.lng() + lngOffset), new google.maps.LatLng(tile.center.lat() + latOffset, tile.center.lng() + lngOffset), new google.maps.LatLng(tile.center.lat() + latOffset, tile.center.lng() - lngOffset)];

      const rect = new google.maps.Polygon({
        paths: tileCoords,
        strokeColor: "#444",
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: fillColor,
        fillOpacity: 0.7,
        zIndex: 2,
      });
      rect.setMap(map);
      this.tilePolygons.push(rect);

      const currentZoom = map.getZoom() ?? 0;

      const labelMarker = new google.maps.Marker({
        position: tile.center,
        map: currentZoom >= 16 ? map : null,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0,
        },
        label: {
          text: tile.elevation != null ? `${tile.elevation.toFixed(1)} m` : "N/A",
          color: "#000",
          fontSize: "10px",
          fontWeight: "bold",
        },
      });
      this.tileLabels.push(labelMarker);
    });
  }

  getGradientColor(baseColor: "red" | "blue" | "green", ratio: number): string {
    const minValue = 50;
    const maxValue = 255;
    const value = Math.floor(minValue + (maxValue - minValue) * ratio);
    const r = baseColor === "red" ? 255 : value;
    const g = baseColor === "green" ? 255 : value;
    const b = baseColor === "blue" ? 255 : value;
    return `rgb(${r}, ${g}, ${b})`;
  }

  onSubmitElevation() {
    if (this.enteredElevation === null || isNaN(this.enteredElevation)) {
      alert("Please enter a valid elevation.");
      return;
    }

    this.highlightTilesBelowElevation(this.enteredElevation);
  }

  highlightTilesBelowElevation(maxElevation: number) {
    const highlightColor = "#4285F4"; // Blue
    const defaultOpacity = 0.3;

    this.tilePolygons.forEach((polygon, index) => {
      const tile = this.generatedTiles[index];
      if (!tile || tile.elevation == null) return;

      if (tile.elevation < maxElevation) {
        polygon.setOptions({
          fillColor: highlightColor,
          fillOpacity: 0.6,
        });
      } else {
        polygon.setOptions({
          fillColor: this.getGradientColor(this.baseGradientColor, this.getElevationRatio(tile.elevation)),
          fillOpacity: defaultOpacity,
        });
      }
    });
  }

  private getElevationRatio(elevation: number): number {
    const elevations = this.generatedTiles.map(t => t.elevation).filter((e): e is number => e !== null && e !== undefined);
    const min = Math.min(...elevations);
    const max = Math.max(...elevations);
    return max !== min ? (elevation - max) / (min - max) : 0;
  }
}
