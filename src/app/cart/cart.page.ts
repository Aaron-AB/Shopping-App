import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  selectedItems = [];
  items = [];
  total = 0;
  constructor(private cartService: CartService) { }

  ngOnInit() {

    this.items = this.cartService.getCart();
    console.log(this.items);
    let selected = {};
    for (let obj of this.items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.name] = {...obj, count: 1};
      }
    }

    this.selectedItems = Object.keys(selected).map(key => selected[key]);
    //console.log('items: ', this.selectedItems);
    this.total = this.selectedItems.reduce((a,b) => a + (b.count * b.price), 0);
  }

}
