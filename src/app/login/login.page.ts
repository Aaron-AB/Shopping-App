import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationServiceService } from "../services/authentication-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationServiceService,
    public router: Router
  ) { }

  ngOnInit() {
  }

}
