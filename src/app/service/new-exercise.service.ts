import { Injectable } from '@angular/core';
import {Exercise} from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class NewExerciseService {

  exercises: Exercise[] = new Array();


  constructor() { }



  createNewExercises() {
      for (let j = 0; j < 10; j++) {
          const myExercise =  new Exercise(this.generateExerciseId(1, 1, j + 1), false);
          myExercise.audio = 'Audio';
          myExercise.audioQuestion = 'AudioQuestion';
          myExercise.check = ['this', 'is', 'a', 'test'];
          myExercise.givenWords = ['given', 'word', 'given', 'word', 'given', 'word'];
          myExercise.img = 'img';
          myExercise.questions = ['this', 'is', '', 'test'];
          this.exercises.push(myExercise);
      }
  }

  getStringNumber(i: number): string {
    return i < 10 ? '0' + i : i + '';
  }

  generateExerciseId(question: number, unit: number, exercise: number) {
    return this.getStringNumber(question) + this.getStringNumber(unit) + this.getStringNumber(exercise);
  }


}
