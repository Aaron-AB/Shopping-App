import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { FirebaseService } from '../services/firebase.service';
import { redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ModalController } from '@ionic/angular';
import { CheckoutmodalPage } from '../checkoutmodal/checkoutmodal.page';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  
  selectedItems = [];
  //items from cart
  items = [];
  total = 0;
  constructor(private cartService: CartService,private af:AngularFireAuth,private firebaseService: FirebaseService,public modalController: ModalController ) { }

  ngOnInit() {

    this.items = this.cartService.getCart();   
    console.log(this.items);
    console.log("CART ^");


    /*
    //count the number of each item there are
    let counter = {};
    this.items.forEach(function(obj) {
      var key = JSON.stringify(obj);
      counter[key] = (counter[key] || 0) + 1;
    })

    var counterArr = Object.entries(counter);

    //convert the json file to an array
    var arrayLength = counterArr.length;
    for (var i =0; i < arrayLength; i++) {
      counterArr[i][0] = JSON.parse(counterArr[i][0]);
    }

    this.selectedItems = counterArr;
    this.total = this.cartService.calculateTotal(counterArr);
    console.log(this.total);
    console.log(counterArr);
    */

  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() { 
    return this.items.reduce((i, j) => i + j.Price * j.Amount, 0);
  }


  //new was fixing the decreasecartitem()
  async calculateTotal() {
    this.items = this.cartService.getCart();   
    
    let counter = {};
    this.items.forEach(function(obj) {
      var key = JSON.stringify(obj);
      counter[key] = (counter[key] || 0) + 1;
    })

    var counterArr = Object.entries(counter);

    var arrayLength = counterArr.length;
    for (var i =0; i < arrayLength; i++) {
      counterArr[i][0] = JSON.parse(counterArr[i][0]);
    }

    this.selectedItems = counterArr;
    this.total = this.cartService.calculateTotal(counterArr);
    console.log(this.total);
    return this.total;
  }


  clear(){
    this.cartService.clearcart();
    this.items = [];
    this.total = 0;
  }

  async senddata(){
    let user = await this.af.currentUser

    if(!user) {
    }


    var data= {
      user: user.displayName,
      userid:user.uid,
      useremail:user.email,
      items : this.items,
      date: Date.now(),
      amount: this.total,
    }

    console.log(data);
    this.firebaseService.create_student(data,"order");
    this.clear();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CheckoutmodalPage ,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }
}
