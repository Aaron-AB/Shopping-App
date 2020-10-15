import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  register(form) {
    /*
    form.value.subscribe((res) => {
      console.log(res);
    })*/
    console.log(form);
  }
}
