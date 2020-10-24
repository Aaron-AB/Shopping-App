import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  userData;

  register(form) {
    this.userData = form.value;
    console.log(form.value);
  }

  getUserID() {
    let uid = firebase.auth().currentUser.uid
    if (uid) {
        this.firebaseService.append_item(uid, "order", this.userData);
    }
  }




  
}
