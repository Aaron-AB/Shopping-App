import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { FirebaseService } from '../services/firebase.service';
import { redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ModalController } from '@ionic/angular';



declare var paypal;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  @ViewChild('paypal',{static: true}) paypalElement: ElementRef;
  paidFor = false;
  product1 ={
    price: 2.00,
    description: 'this is the total cost of all the items bought'
  }
  selectedItems = [];
  //items from cart
  items = [];
  total = 0;
  constructor(private cartService: CartService,private af:AngularFireAuth,private firebaseService: FirebaseService) { }
 


  
  ngOnInit() {
    this.items = this.cartService.getCart();   
    console.log(this.items);
    console.log("CART ^");
//top
paypal
.Buttons({
  createOrder: (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: this.product1.description,
          amount: {
            currency_code: 'USD',
            value: 3.00,
          }
        }
      ]
    });
  }, onApprove: async (data, actions) => {
    const order = await actions.order.capture();
    this.paidFor = true;
    console.log(order);
  },
  onError: err => {
    console.log(err);
  }
})
.render(this.paypalElement.nativeElement);
    //bottom

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

  async sendData(){
    let user = await this.af.currentUser;
    let total = this.getTotal();
    let items = this.createItemList();

    if(!user){
      return;
    }

    let userId = user.uid;

    var data = {
      userid: userId,
      items : items,
      amount: total
    }

    let recDate = new Date();
    recDate.setHours(0, 0, 0, 0);

    let userData = {}
    userData[userId] = data;

    console.log(userData);
    this.firebaseService.append_item(recDate, "orders", userData);
  }

  createItemList() {
    let newItemList = [];
    for(var item of this.items) {
      newItemList.push({"name": item.Name, "amount": item.Amount, "price": item.Price})
    }
    return newItemList;
  }
/*
  async presentModal() {
    const modal = await this.ModalController.create({
      component: CheckoutmodalPage ,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }*/

}

