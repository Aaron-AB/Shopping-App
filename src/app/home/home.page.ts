import { Component, OnInit } from '@angular/core';
import { CartService, CropData } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  cropList: CropData[];
  
  cropArr = [];//Stores the document
  cart = []; 
  items = [];//Stores the crops

  cartItemCount = this.cartService.cartItemCount;

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6,
    speed: 400
  }
  constructor(private cartService: CartService, private router: Router) {

  }

  ngOnInit() {

    this.cartService.getProductsArr().subscribe(res => {
      this.cropArr = res;
      console.log(this.cropArr);
      this.items = this.cropArr[0].data.Data;

      console.log(this.items);
      console.log(JSON.stringify(this.items));
    })

    this.cart = this.cartService.getCart();
  }

  addToCart(product) {
    this.cartService.addProduct(product);
    console.log(product);
  }

  async removeFromCart(product) {
    this.cartService.decreaseProduct(product);
    console.log(product);
  }

  openCart() {
    this.router.navigate(['cart']);
  }

}
