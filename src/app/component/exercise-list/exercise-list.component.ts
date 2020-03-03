import { Component, OnInit } from '@angular/core';
import {Exercise} from '../../models/exercise.model';
import {ExerciseService} from '../../service/exercise.service';
import {resolve} from 'url';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  exercises: Exercise[];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe(data => {
      this.exercises = data.map( e => {
        const idData = e.payload.doc.id;
        const myData: any = e.payload.doc.data();
        return {
          id: idData,
          ...myData
        } as Exercise;
      });
    });
  }

}
