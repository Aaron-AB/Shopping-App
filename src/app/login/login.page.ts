import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationServiceService } from "../services/authentication-service.service";
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //For phone number linking
  recaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;
  otpSent = false;
  phoneNumber;
  pNumber;

  //For GPS coordinates
  coords: any;

  constructor(
    public authService: AuthenticationServiceService,
    public router: Router,
    public af: AngularFireAuth
  ) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.
      RecaptchaVerifier('recaptcha-container', { 'size': 'invisible'});
  }

  sendOTP() {
    var pNumber = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    this.pNumber = pNumber;
    this.af.currentUser.then(u => u.linkWithPhoneNumber(this.pNumber, this.recaptchaVerifier)).then((result) => {
      this.otpSent = true;
      this.phoneNumber = pNumber;
      this.confirmationResult = result;
      alert("OTP Sent!");
    }).catch(err => {
      alert(err);
    })

    console.log(this.af.currentUser);
  }

  verifyOTP() {
    var otp = (<HTMLInputElement>document.getElementById("otp")).value;
    this.confirmationResult.confirm(otp).then(() => {
      alert("OTP Verified!");
    }).catch(err => {
      alert(err);
    })
  }


  /////////////////////////////LOCATION/////////////////////////////////
  async locate() {
    const coordinates = await Geolocation.getCurrentPosition({'enableHighAccuracy': true});
    this.coords = coordinates.coords;
    console.log(this.coords);
  }

  getUser() {
    console.log(this.af.currentUser.then((u) => console.log(u.uid)));
  }

}
