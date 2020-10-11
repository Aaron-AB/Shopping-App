import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';


export interface CropData {
  id: String;
  Category: String;
  Name: String;
  Price: number;
  Unit: number;
  Image: string;
}

export interface testData {
  id?: String;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //For Observable
  private cropdata: Observable<CropData[]>;
  private cropCollection: AngularFirestoreCollection<CropData>;
  
  cropList: CropData[];
  private cart = [];

  cartItemCount: BehaviorSubject<number>;


  //Made for normal Array, displays onto UI the items available for sale
  private cropArray = new Observable<any[]>();

  constructor(
    private firebaseService: FirebaseService,
    private afs: AngularFirestore
  ) {
    //change back to read_items()
    this.cropArray = this.firebaseService.get_recent().pipe(
      map(actions => {
        return actions.map(a => {
          return {
            id: a.payload.doc.id,
            data: a.payload.doc.data()
          }
        })
      })
    )

    console.log(this.cropArray);
  }

  getProductsArr() {
    return this.cropArray;
  }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.Name === product.Name) {
        p.Amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    //this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.Name === product.Name) {
        p.Amount -= 1;
        if (p.Amount === 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    //this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.Name == product.Name) {
        //this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

  calculateTotal(items) {
    let total = 0;
    for(var i = 0; i < items.length; i++ ){
      total += items[i][0].Price * items[i][1];
    }
    return total;
  }
  clearcart(){
    this.cart = []; 
     }
}
