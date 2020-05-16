import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Exercise} from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentCreatorService {

  constructor(private firestore: AngularFirestore) {
  }

  createExercise(exercise: Exercise) {

    const exerciseNo = exercise.id.substr(0, 2);
    const unitNo = exercise.id.substr(2, 2);
    const questionNo = exercise.id.substr(4, 2);

    // return new Promise<any> ( (resolve, reject) =>  {
    //   this.firestore
    //     .collection('englishQuestion')
    //     .doc(exerciseNo)
    //     // .set({test: 'test'}) .then(data => {
    //     //   console.log(data);
    //     // });
    //     .collection(unitNo)
    //     .doc(questionNo)
    //     .set(exercise);
    //     // .then(res => { console.log(res); }, err => reject(err));
    // }
    // );

    return this.firestore
      .collection('englishQuestion')
      .doc(exerciseNo)
      .collection(unitNo)
      .doc(questionNo)
      .update(exercise);
  }

  onSubmit(exercise: Exercise) {
    this.createExercise(exercise).then( res => {
      console.log(res);
    });
  }
}
