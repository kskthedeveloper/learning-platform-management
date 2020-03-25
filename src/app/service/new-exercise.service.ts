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
          this.exercises.push(new Exercise(this.generateExerciseId(1, i + 1, j + 1)));
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
