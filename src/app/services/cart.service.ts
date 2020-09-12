import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { map, take } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
//import { map } from 'rxjs/operators';


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


  //Made for normal Array, displays onto UI the items available for sale
  private cropArray = new Observable<any[]>();

  constructor(
    private firebaseService: FirebaseService,
    private afs: AngularFirestore
  ) {
    //WORKS WELL WITH SIMPLE INTERFACE
    /*
    this.cropCollection = this.afs.collection<CropData>('cropdata');
    this.cropdata = this.firebaseService.read_items().pipe(
      map(actions => {
        return actions.map(a => {
                    
          return { 
            id: a.payload.doc.id,
            isEdit: false,
            Category: a.payload.doc.data()['Category'],
            Name: a.payload.doc.data()['Crop'],
            Price: a.payload.doc.data()['Price'],
            Unit: a.payload.doc.data()['Unit'],
            Image: a.payload.doc.data()['Image'] };
        })
      })
    );*/

    this.cropArray = this.firebaseService.read_items().pipe(
      map(actions => {
        return actions.map(a => {
          return {
            id: a.payload.doc.id,
            data: a.payload.doc.data()
          }
        })
      })
    )
  }

  getProductsArr() {
    return this.cropArray;
  }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.push(product);
    //console.log(this.cart);
  }

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.name === product.name) {
        this.cart.splice(index, 1);
        return
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
}
