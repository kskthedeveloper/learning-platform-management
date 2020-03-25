import { Component, OnInit } from '@angular/core';
import {ExerciseMenuService} from '../../service/exercise-menu.service';
import {Exercise} from "../../models/exercise.model";
import {ExerciseService} from "../../service/exercise.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-exercise-menu',
  templateUrl: './exercise-menu.component.html',
  styleUrls: ['./exercise-menu.component.scss']
})
export class ExerciseMenuComponent implements OnInit {

  exercises: Exercise[];
  map: Map<string, Exercise[]>;
  buttons: string[] = new Array();

  constructor(private exerciseService: ExerciseService,
              private exerciseMenuService: ExerciseMenuService,
              private router: Router) { }

  ngOnInit() {
    this.exerciseService.getExercises().subscribe(data => {
      this.exercises = data.map( e => {
        const idData = e.payload.doc.id;
        const myData: any = e.payload.doc.data();
        return {
          id: idData,
          ...myData
        } as Exercise;
      });

      this.map = this.exerciseMenuService.categorizeExerciseByUnit(this.exercises);
      console.log(this.map.get('01'));

      for (const key of this.map.keys()) {
        this.buttons.push(key);
      }

    });
  }

  addNewUnit() {
    this.router.navigate(['/new-form']);
  }

  goToDetail(button: any) {
    console.log(button);
  }
}