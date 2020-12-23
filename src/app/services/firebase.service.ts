import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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

  update_item(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_student(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

  append_item(recordID, collectionName, newObj) {
    this.firestore.doc(collectionName + '/' + recordID).set(newObj);
  }

  append_array(recordID) {
    this.firestore.collection("Users" + '/' + recordID).doc("Friends")
  }

  get_recent() {
    return this.firestore.collection<any>(this.collectionName, ref => ref.orderBy('Date', 'desc')).snapshotChanges();
  }
}
