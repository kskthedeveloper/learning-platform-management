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

  getExerciseById(exerciseId: string, unitId: string) {
    return this.firestore.collection('englishQuestion').doc(exerciseId).collection(unitId).snapshotChanges();
  }

  getQuestionById(exerciseId: string, unitId: string, questionId: string) {
    return this.firestore.collection('englishQuestion').doc(exerciseId).collection(unitId).doc(questionId).snapshotChanges();
  }

}
