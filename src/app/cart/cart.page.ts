import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

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
  constructor(private cartService: CartService) { }

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

}
