import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { GoogleMap } from "@angular/google-maps";
import { ToastrService } from "ngx-toastr";

interface Tile {
  sw: google.maps.LatLng;
  ne: google.maps.LatLng;
  center: google.maps.LatLng;
  elevation: number | null; // not optional
}

@Component({
  selector: "app-village-polygon-add",
  templateUrl: "./village-polygon-add.component.html",
  styleUrls: ["./village-polygon-add.component.scss"],
})
export class VillagePolygonAddComponent implements OnInit {
  @ViewChild(GoogleMap) googleMap!: GoogleMap;
  center: google.maps.LatLngLiteral = { lat: 21.699847, lng: 72.997601 };
  zoom = 16;
  baseGradientColor: "red" | "blue" | "green" = "red";
  polygonCoords: google.maps.LatLngLiteral[] = [];
  polygon: google.maps.Polygon | null = null;
  polyline: google.maps.Polyline | null = null;
  firstPoint: google.maps.LatLngLiteral | null = null;
  elevationService = new google.maps.ElevationService();
  firstMarker: google.maps.Marker | null = null;
  private generatedTiles: Tile[] = [];
  villages: any[] = []; // Api response store karenge yaha
  selectedVillageId: number | null = null;
  private generatedTileRectangles: google.maps.Polygon[] = [];
  private generatedTileLabels: google.maps.Marker[] = [];
  private tilePolygons: google.maps.Polygon[] = [];
  private tileLabels: google.maps.Marker[] = [];
  enteredElevation: number | null = null;
  polygons: google.maps.Polygon[] = []; // Your polygons on map
  polygonData: { polygon: google.maps.Polygon; elevation: number }[] = [];
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  tilesDrawn = false; // New flag to track if tiles are drawn
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

  tilesWithElevation: {
    sw: google.maps.LatLng;
    ne: google.maps.LatLng;
    center: google.maps.LatLng;
    elevation: number | null;
  }[] = [];

  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: this.zoom,
    styles: this.simpleMapStyle,
    clickableIcons: false,
    disableDefaultUI: true, // optional: hides default controls
  };

  ngOnInit() {
    this.getVillageMaster();
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    const latLng = event.latLng;
    if (!latLng) return;

    const newPoint = { lat: latLng.lat(), lng: latLng.lng() };

    if (this.polygon) {
      return; // Polygon finalized, no new points added
    }

    if (!this.firstPoint) {
      this.firstPoint = newPoint;

      this.firstMarker = new google.maps.Marker({
        position: new google.maps.LatLng(newPoint.lat, newPoint.lng),
        map: this.googleMap.googleMap!,
        title: "Click to close polygon",
      });

      this.firstMarker.addListener("click", () => {
        this.finalizePolygon();
      });
    }

    this.polygonCoords.push(newPoint);
    this.drawPolyline();
  }

  isClose(point1: google.maps.LatLngLiteral, point2: google.maps.LatLngLiteral): boolean {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(point1.lat, point1.lng), new google.maps.LatLng(point2.lat, point2.lng));
    return distance < 20;
  }

  drawPolyline() {
    if (this.polyline) {
      this.polyline.setMap(null);
    }

    if (this.polygon) {
      return;
    }

    this.polyline = new google.maps.Polyline({
      path: this.polygonCoords,
      strokeColor: "#000000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      editable: true,
    });

    if (this.googleMap && this.googleMap.googleMap) {
      this.polyline.setMap(this.googleMap.googleMap);
    }
  }

  private updatePolygonCoords() {
    if (this.polygon) {
      const path = this.polygon.getPath();
      this.polygonCoords = [];

      for (let i = 0; i < path.getLength(); i++) {
        const point = path.getAt(i);
        this.polygonCoords.push({ lat: point.lat(), lng: point.lng() });
      }

      console.log("PolygonCoords updated:", this.polygonCoords);
    }
  }

  finalizePolygon() {
    if (this.polygon) {
      this.polygon.setMap(null);
      this.polygon = null;
    }

    if (this.polygonCoords.length && !this.isClose(this.polygonCoords[0], this.polygonCoords[this.polygonCoords.length - 1])) {
      if (this.firstPoint && this.firstPoint.lat !== undefined && this.firstPoint.lng !== undefined) {
        this.polygonCoords.push(this.firstPoint);
      } else {
        console.warn("⚠️ Warning: firstPoint is invalid, not pushing to polygonCoords");
      }
    }
    console.log("Polygon Coordinates before creating polygon:", this.polygonCoords);

    this.polygon = new google.maps.Polygon({
      paths: this.polygonCoords,
      strokeColor: "#000000",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#fffff",
      fillOpacity: 0.3,
      editable: true,
    });

    if (this.googleMap && this.googleMap.googleMap) {
      this.polygon.setMap(this.googleMap.googleMap);
    }

    this.polyline?.setMap(null);
    this.polyline = null;

    this.firstMarker?.setMap(null);
    this.firstMarker = null;

    const path = this.polygon.getPath();

    google.maps.event.clearListeners(path, "set_at");
    google.maps.event.clearListeners(path, "insert_at");

    google.maps.event.addListener(path, "set_at", () => {
      this.updatePolygonCoords();
      this.tilesDrawn = false; // polygon changed, tiles need redraw
      this.pushPolygonData(); // Call to push updated polygon data
    });
    google.maps.event.addListener(path, "insert_at", () => {
      this.updatePolygonCoords();
      this.tilesDrawn = false; // polygon changed, tiles need redraw
      this.pushPolygonData(); // Call to push updated polygon data
    });

    this.updatePolygonCoords();
    console.log("Polygon Coordinates after finalizing:", this.polygonCoords);
    this.tilesDrawn = false; // Reset tiles drawn flag on finalize
  }

  private pushPolygonData() {
    const requestBody = this.getFinalJson();
    this.callApi(requestBody); // Call the API to push the updated polygon data
  }

  onDrawTilesClick() {
    // Ensure we update coords from the actual drawn polygon path
    this.updatePolygonCoords();

    // Now recreate the polygon (optional, for visual update)
    this.finalizePolygon();

    // Then draw tiles
    setTimeout(() => {
      console.log("PolygonCoords before tiles draw:", this.polygonCoords);
      this.drawTilesWithinPolygon();
    }, 100);
  }

  callApi(body: any) {
    this.http.post("http://localhost:5000/api/MasterController/AddVillagePolygon", body).subscribe({
      next: res => console.log("API Success:", res),
      error: err => console.error("API Error:", err),
    });
  }

  getFinalJson() {
    return {
      VillageId: this.selectedVillageId || 0,
      CreatedBy: 1,
      Points: this.polygonCoords.map((coord, index) => ({
        PointId: index + 1,
        Latitude: coord.lat,
        Longitude: coord.lng,
        PointOrder: index + 1,
      })),
      Tiles: this.generatedTiles.map((tile, index) => ({
        TileId: index + 1,
        Center_Latitude: tile.center.lat(),
        Center_Longitude: tile.center.lng(),
        Elevation: tile.elevation,
      })),
    };
  }

  drawTilesWithinPolygon() {
    this.clearTileOverlays();
    if (!this.polygon) return;

    const bounds = new google.maps.LatLngBounds();
    this.polygon.getPath().forEach(coord => bounds.extend(coord));

    const tileSizeMeters = 100;
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const startLat = sw.lat();
    const endLat = ne.lat();
    const startLng = sw.lng();
    const endLng = ne.lng();

    const stepLat = tileSizeMeters / 111320;
    const stepLng = tileSizeMeters / (111320 * Math.cos((startLat * Math.PI) / 180));

    const tiles: Tile[] = [];

    for (let lat = startLat; lat < endLat; lat += stepLat) {
      for (let lng = startLng; lng < endLng; lng += stepLng) {
        const centerLat = lat + stepLat / 2;
        const centerLng = lng + stepLng / 2;
        const centerPoint = new google.maps.LatLng(centerLat, centerLng);

        if (google.maps.geometry.poly.containsLocation(centerPoint, this.polygon)) {
          tiles.push({
            // sw and ne ko hata ke null kar do ya hata do agar optional hai
            sw: null as any, // agar type chahiye toh aise karo
            ne: null as any,
            center: centerPoint,
            elevation: null,
          });
        }
      }
    }

    this.baseGradientColor = "red"; // globally set color here also
    this.drawTilesWithElevations(tiles, true); // true = fetch elevation from Google
    this.tilesDrawn = true;
    console.log("PolygonCoords before tiles draw:", this.polygonCoords);
    console.log("Polygon:", this.polygon);
  }

  private clearTileOverlays() {
    console.log("Clearing", this.tilePolygons.length, "polygons and", this.tileLabels.length, "labels");
    this.tilePolygons.forEach(p => p.setMap(null));
    this.tileLabels.forEach(l => l.setMap(null));
    this.tilePolygons = [];
    this.tileLabels = [];
    this.generatedTiles = [];
  }

  loadPolygonFromApi1(villageId: number) {
    this.clearMapData();
    this.http.get(`http://localhost:5000/api/MasterController/GetVillagePolygonWithPointsAndTiles?VillageId=${villageId}`).subscribe({
      next: (res: any) => {
        const data = res?.Table?.[0];
        if (!data) {
          this.toastr.error("No data found for this village.", "Error");
          return;
        }

        const points = JSON.parse(data.Points);

        // Agar polygon pehle se hai to uske points update kar do
        if (this.polygon) {
          const newCoords = points.map((p: any) => ({ lat: p.Latitude, lng: p.Longitude }));
          this.polygon.setPaths(newCoords);
        } else {
          // Naya polygon create karo
          this.polygonCoords = points.map((p: any) => ({
            lat: p.Latitude,
            lng: p.Longitude,
          }));

          this.polygon = new google.maps.Polygon({
            paths: this.polygonCoords,
            strokeColor: "#000000",
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: "#fffff",
            fillOpacity: 0,
            editable: true,
            zIndex: 1,
          });
          this.polygon.setMap(this.googleMap.googleMap!);
        }

        // Baaki tiles ka handling waisa hi jaisa tha
        const tilesRaw = JSON.parse(data.Tiles);
        const tiles = tilesRaw.map((tile: any) => ({
          sw: null as any,
          ne: null as any,
          center: new google.maps.LatLng(tile.Center_Latitude, tile.Center_Longitude),
          elevation: tile.Elevation,
        }));
        this.tilesWithElevation = tiles;
        this.baseGradientColor = "red"; // global color set karo
        this.drawTilesWithElevations(tiles, false);
        this.tilesDrawn = true;
      },
      error: err => {
        console.error("API fetch error", err);
        this.toastr.error("No data found for this village.");
      },
    });
  }
  loadPolygonFromApi(villageId: number) {
    this.clearMapData();
    this.http.get(`http://localhost:5000/api/MasterController/GetVillagePolygonWithPointsAndTiles?VillageId=${villageId}`).subscribe({
      next: (res: any) => {
        const data = res?.Table?.[0];
        if (!data) {
          this.toastr.error("No data found for this village.", "Error");
          return;
        }

        console.log("Raw data:", data);

        try {
          // ✅ Parse the polygon points and tiles from JSON strings
          const points = JSON.parse(data.PointJson);
          const tilesRaw = JSON.parse(data.TilesJson);

          const polygonCoords = points.map((p: any) => ({
            lat: p.Latitude,
            lng: p.Longitude,
          }));

          // ✅ Draw or update the polygon
          if (this.polygon) {
            this.polygon.setPaths(polygonCoords);
          } else {
            this.polygonCoords = polygonCoords;
            this.polygon = new google.maps.Polygon({
              paths: this.polygonCoords,
              strokeColor: "#000000",
              strokeOpacity: 1,
              strokeWeight: 2,
              fillColor: "#ffffff",
              fillOpacity: 0,
              editable: true,
              zIndex: 1,
            });
            this.polygon.setMap(this.googleMap.googleMap!);
          }

          // ✅ Prepare tile objects for rendering
          const tiles = tilesRaw.map((tile: any) => ({
            sw: null as any,
            ne: null as any,
            center: new google.maps.LatLng(tile.Center_Latitude, tile.Center_Longitude),
            elevation: tile.Elevation,
          }));

          // ✅ Draw tiles with elevation coloring
          this.tilesWithElevation = tiles;
          this.baseGradientColor = "red"; // or any global color
          this.drawTilesWithElevations(tiles, false);
          this.tilesDrawn = true;
        } catch (e) {
          console.error("Error parsing JSON data:", e);
          this.toastr.error("Failed to process village data.", "Error");
        }
      },
      error: err => {
        console.error("API fetch error", err);
        this.toastr.error("No data found for this village.");
      },
    });
  }

  private drawTilesWithElevations(tiles: { sw: google.maps.LatLng; ne: google.maps.LatLng; center: google.maps.LatLng; elevation?: number | null }[], fetchElevation: boolean = false) {
    const map = this.googleMap.googleMap!;
    this.generatedTiles = [];

    if (fetchElevation) {
      // Fetch elevations dynamically and ensure elevation property is always set
      let tileRequestCount = tiles.length;
      let tileResponseCount = 0;

      tiles.forEach(tile => {
        this.elevationService.getElevationForLocations({ locations: [tile.center] }, (results, status) => {
          let elevation: number | null = null;
          if (status === google.maps.ElevationStatus.OK && results && results[0]) {
            elevation = results[0].elevation;
          }

          // Push a tile with guaranteed elevation property
          this.generatedTiles.push({
            sw: tile.sw,
            ne: tile.ne,
            center: tile.center,
            elevation: elevation,
          });

          tileResponseCount++;
          if (tileResponseCount === tileRequestCount) {
            this.colorAndLabelTiles(this.generatedTiles, map);
            const requestBody = {
              ...this.getFinalJson(),
            };
            console.log("Auto API Request Body:", requestBody);
            this.callApi(requestBody);
          }
        });
      });
    } else {
      // If elevation already passed, normalize tiles to ensure elevation is never undefined
      this.generatedTiles = tiles.map(t => ({
        sw: t.sw,
        ne: t.ne,
        center: t.center,
        elevation: t.elevation !== undefined ? t.elevation : null,
      }));
      this.colorAndLabelTiles(this.generatedTiles, map);
    }
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
        fillOpacity: 0.3,
        zIndex: 2,
      });
      rect.setMap(map);
      this.tilePolygons.push(rect);

      const labelMarker = new google.maps.Marker({
        position: tile.center,
        map: map,
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
    // Shift range to make even low elevation tiles slightly darker
    const minValue = 50; // dark base
    const maxValue = 255; // lightest allowed

    const colorValue = Math.floor(minValue + (maxValue - minValue) * ratio);

    const r = baseColor === "red" ? 255 : colorValue;
    const g = baseColor === "green" ? 255 : colorValue;
    const b = baseColor === "blue" ? 255 : colorValue;

    return `rgb(${r}, ${g}, ${b})`;
  }

  getVillageMaster() {
    // API call
    this.http.get<{ Table: any[] }>("http://localhost:5000/api/MasterController/GetVillageMaster?IsAll=true&VillageID=0").subscribe(
      response => {
        this.villages = response.Table; // Table key se village array milega
      },
      error => {
        console.error("Error fetching villages", error);
      }
    );
  }

  onVillageChange(event: any) {
    this.selectedVillageId = +event.target.value; // + to convert string to number
    console.log("Selected village:", this.selectedVillageId);

    if (this.selectedVillageId) {
      this.loadPolygonFromApi(this.selectedVillageId);
    }
  }

  private clearMapData() {
    // Remove polygon
    if (this.polygon) {
      this.polygon.setMap(null);
      this.polygon = null;
    }

    // Remove polyline
    if (this.polyline) {
      this.polyline.setMap(null);
      this.polyline = null;
    }

    // Remove first marker
    if (this.firstMarker) {
      this.firstMarker.setMap(null);
      this.firstMarker = null;
    }

    // Reset polygon coordinates
    this.polygonCoords = [];
    this.firstPoint = null;

    this.tilePolygons.forEach(p => p.setMap(null));
    this.tileLabels.forEach(l => l.setMap(null));
    this.tilePolygons = [];
    this.tileLabels = [];

    this.generatedTileRectangles?.forEach(r => r.setMap(null));
    this.generatedTileLabels?.forEach(m => m.setMap(null));

    this.generatedTileRectangles = [];
    this.generatedTileLabels = [];

    this.generatedTiles = [];
    this.tilesDrawn = false;
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

  onSubmitElevation() {
    if (this.enteredElevation === null || isNaN(this.enteredElevation)) {
      alert("Please enter a valid elevation.");
      return;
    }

    this.highlightTilesBelowElevation(this.enteredElevation);
  }
}
