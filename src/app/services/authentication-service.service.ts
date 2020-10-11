import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  userData: any;

  constructor(
  ) { 
  }

  checkLogin() {
    if(firebase.auth().currentUser) {
      return true;
    }
    else {
      return false;
    }
  }
}
