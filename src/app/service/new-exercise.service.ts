import { Injectable } from '@angular/core';
import {Exercise} from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class NewExerciseService {

  exercises: Exercise[] = new Array();


  constructor() { }



  createNewExercises() {
    // need to refactor it
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 10; j++) {
          const myExercise =  new Exercise(this.generateExerciseId(1, i + 1, j + 1), false);
          myExercise.audio = 'Audio';
          myExercise.audioQuestion = 'AudioQuestion';
          // myExercise.check = ['this', 'is', 'a', 'test'];
          myExercise.check = 'check';
          // myExercise.givenWords = ['this', '', 'a', 'test'];
          myExercise.givenWords = 'givenWords';
          myExercise.img = 'img';
          // myExercise.questions = ['this', 'is', 'a', 'test'];
          myExercise.questions = 'question';

        this.exercises.push(myExercise);
      }
    }
  }

  getStringNumber(i: number): string {
    return i < 10 ? '0' + i : i + '';
  }

  generateExerciseId(question: number, unit: number, exercise: number) {
    return this.getStringNumber(question) + this.getStringNumber(unit) + this.getStringNumber(exercise);
  }


}
