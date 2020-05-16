import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private firestore: AngularFirestore) { }

  getCollection(collectionName: string) {
    // return this.firestore.collection('question').snapshotChanges();
    return this.firestore.collection(collectionName).snapshotChanges();
  }
}
