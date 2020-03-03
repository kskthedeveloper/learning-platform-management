import { Injectable } from '@angular/core';
import {ExerciseService} from './exercise.service';
import {Exercise} from '../models/exercise.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExerciseMenuService {
  // need exercise map by title
  exercises: Exercise[];

  constructor(private exerciseService: ExerciseService) { }

  categorizeExerciseByUnit(exercises: Exercise[]) {
    const map  = new Map();
    exercises.forEach((exercise) => {
      const unit: string = exercise.id.substr(0, 2);

      const temp = map.get(unit) as Exercise[];
      if (!temp) {
        const exerciseList = [];
        exerciseList.push(exercise);
        map.set(unit, exerciseList);
      } else {
        temp.push(exercise);
      }
    });
    return map;
  }
}
