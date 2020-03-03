import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import {Exercise} from '../models/exercise.model';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private firestore: AngularFirestore) { }

  getExercises() {
    return this.firestore.collection('question').snapshotChanges();
  }

  getExerciseById(id: string) {
    return this.firestore.collection('question').doc(id).valueChanges();
  }

}
