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

    console.log('Writing, ', exercise.id);

    const exerciseNo = exercise.id.substr(0, 2);
    const unitNo = exercise.id.substr(2, 2);
    const questionNo = exercise.id.substr(4, 2);

    console.log(exerciseNo, unitNo, questionNo);

    return new Promise<any> ( (resolve, reject) =>  {
      this.firestore
        .collection('englishQuestion')
        .doc(exerciseNo)
        .set({test: 'test'}) .then(data => {
          console.log(data);
        });
        // .collection(unitNo)
        // .doc(questionNo)
        // .set(exercise)
        // .then(res => {}, err => reject(err));
    }
    );
  }

  onSubmit(exercise: Exercise) {
    this.createExercise(exercise).then( res => {
      console.log(res);
    });
  }
}
