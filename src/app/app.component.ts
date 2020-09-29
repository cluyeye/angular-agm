
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  @ViewChild('mapContainer') gmap: ElementRef;

  title = 'angular-agm';

  map: google.maps.Map;
  lat = -12.3757287;
  lng = 13.5610451;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  markers = [
    {
      position: new google.maps.LatLng(-12.361790420529694, 13.509253625260923),
      map: this.map,
      title: "Baia Farta",
      description: "Cliente Estélvio Marques"
    },
    {
      position: new google.maps.LatLng(-12.366066262617915, 13.53380120216522),
      map: this.map,
      title: "Porto Seco",
      description: "Porto Seco"
    },
    {
      position: new google.maps.LatLng(-12.358897899459194, 13.54277050911102),
      map: this.map,
      title: "Canata",
      description: "Canata"
    }
  ];

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //Adding marker to google map
      marker.setMap(this.map);
    });
  }



  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);

    this.marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    this.marker.setMap(this.map);

    //Adding other markers
    this.loadAllMarkers();

  }



}


