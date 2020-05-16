import {Injectable} from '@angular/core';
import {Exercise} from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class NewExerciseService {

  exercises: Exercise[] = new Array();


  constructor() {
  }


  createNewExercises(questionId: number) {
    this.exercises = [];

    for (let i = 1; i <= 4; i++) {
      for (let j = 0; j < 10; j++) {
        const myExercise = new Exercise(this.generateExerciseId(questionId, i, j + 1), false);
        myExercise.audio = '';
        myExercise.audioQuestion = '';
        myExercise.check = [];
        myExercise.givenWords = [];
        myExercise.img = '';
        myExercise.questions = [];
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
