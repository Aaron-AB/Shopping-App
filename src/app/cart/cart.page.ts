import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { FirebaseService } from '../services/firebase.service';

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
  constructor(private cartService: CartService,private af:AngularFireAuth,private firebaseService: FirebaseService) { }

  ngOnInit() {

    this.items = this.cartService.getCart();   
    console.log(this.items);
    console.log("CART ^");

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
}
