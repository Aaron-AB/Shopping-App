import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { CropData } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Farm';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_student(record) {
    return this.firestore.collection<any>(this.collectionName).add(record);
  }

  read_items() {
    return this.firestore.collection<any>(this.collectionName).snapshotChanges();
  }

  update_student(recordID, record, collectionName) {
    this.firestore.doc(collectionName + '/' + recordID).update(record);
  }

  delete_student(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
}
