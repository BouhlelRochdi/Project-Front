import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'google-maps.component.html',
  styleUrls: ['google-maps.component.css'],
})
export class GoogleMapsComponent {
  title: string = '';
  lat: number = 43.74310100043326;
  lng: number = 7.425446157956461;
  zoom: number = 11;

  markers: Marker[] = [
    {
      lat: 43.74310100043326,
      lng: 7.425446157956461,
      label: 'S',
      draggable: false,
      title: 'Stanford',
      www: 'https://www.stanford.edu/'
    },
    {
      lat: 43.74310100043326,
      lng: 7.425446157956461,
      label: 'T',
      draggable: false,
      title: 'Tesla',
      www: 'https://www.tesla.com/'
    },
    {
      lat: 43.74310100043326,
      lng: 7.425446157956461,
      label: 'A',
      draggable: false,
      title: 'Apple',
      www: 'https://www.apple.com/'
    },
    {
      lat: 43.74310100043326,
      lng: 7.425446157956461,
      label: 'F',
      draggable: false,
      title: 'Facebook',
      www: 'https://www.facebook.com/'
    }
  ];
}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  title: string;
  www: string;
}
