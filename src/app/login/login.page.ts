import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationServiceService } from "../services/authentication-service.service";
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  recaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;
  otpSent = false;
  phoneNumber;
  pNumber;
  return: String = '';

  constructor(
    public authService: AuthenticationServiceService,
    public router: Router,
    public af: AngularFireAuth,
    public route: ActivatedRoute,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.
      RecaptchaVerifier('recaptcha-container', { 'size': 'invisible'});
    
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '');
  }

  sendOTP() {
    var areaCode ="+1868";
    var pNumber = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    pNumber = areaCode + pNumber;
    console.log(pNumber);
    this.pNumber = pNumber;
    /*
    this.af.currentUser.then(u => u.linkWithPhoneNumber(this.pNumber, this.recaptchaVerifier)).then((result) => {
      this.otpSent = true;
      this.phoneNumber = pNumber;
      this.confirmationResult = result;
      alert("OTP Sent!");
    }).catch(err => {
      alert(err);
    })
    */
    this.af.signInWithPhoneNumber(this.pNumber, this.recaptchaVerifier).then((result) => {
    this.otpSent = true;
    this.phoneNumber = pNumber;
    this.confirmationResult = result;
    alert("OTP Sent!");
  }).catch(err => {
    alert(err);
  })

  }

  verifyOTP() {
    var otp = (<HTMLInputElement>document.getElementById("otp")).value;
    document.title = "Verify your number";
    this.confirmationResult.confirm(otp).then(() => {
      console.log(this.af.currentUser);
      this.ngZone.run(() => {
        this.router.navigate([this.return]);
      })
      alert("OTP Verified!");
    }).catch(err => {
      alert(err);
    })
  }

}
