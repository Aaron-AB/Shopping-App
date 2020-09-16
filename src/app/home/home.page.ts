import { Component, OnInit } from '@angular/core';
import { CartService, CropData } from '../services/cart.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    slidesPerView: 1.6
  }
  constructor(private cartService: CartService, private router: Router) {

  }

  ngOnInit() {
    //WORKS WELL
    /*
    this.cartService.getProducts().subscribe(res => {
      this.cropList = res;
      console.log(this.cropList);
    })*/

    this.cartService.getProductsArr().subscribe(res => {
      this.cropArr = res;
      this.items = this.cropArr[0].data.Data;
      console.log(this.items);
    })

    this.cart = this.cartService.getCart();
    //console.log(this.cart);
  }

  addToCart(product) {
    //this.cart.push(product);
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
