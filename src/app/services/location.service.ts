import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  coords: any;
  constructor() { }

  async locate() {
    const coordinates = await Geolocation.getCurrentPosition({'maximumAge': 10, 'enableHighAccuracy': true});
    this.coords = coordinates.coords;
    console.log(this.coords);
  }
  
}
