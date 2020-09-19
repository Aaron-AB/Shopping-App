import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { CropData } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'farm';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_student(record,collectionName) {
    return this.firestore.collection<any>(collectionName).add(record);
  }
  read_items() {
    return this.firestore.collection<any>(this.collectionName).snapshotChanges();
  }

  update_student(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_student(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

  get_recent() {
    return this.firestore.collection<any>(this.collectionName, ref => ref.orderBy('Date', 'desc')).snapshotChanges();
  }
}
