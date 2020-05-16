import { Component, OnInit } from '@angular/core';
import {ExerciseMenuService} from '../../service/exercise-menu.service';
import {Exercise} from '../../models/exercise.model';
import {ExerciseService} from '../../service/exercise.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentCreatorService} from '../../service/document-creator.service';
import {CollectionService} from '../../service/collection.service';
import {NewExerciseService} from '../../service/new-exercise.service';

@Component({
  selector: 'app-exercise-menu',
  templateUrl: './exercise-menu.component.html',
  styleUrls: ['./exercise-menu.component.scss']
})
export class ExerciseMenuComponent implements OnInit {

  exercises: Exercise[];
  map: Map<string, Exercise[]>;
  buttons: string[] = new Array();
  size: number;
  isSaving = false;
  percentage = 0;

  constructor(private exerciseService: ExerciseService,
              private exerciseMenuService: ExerciseMenuService,
              private newExerciseService: NewExerciseService,
              private documentCreatorService: DocumentCreatorService,
              private collectionService: CollectionService,
              private router: Router) { }

  ngOnInit() {
    // this.documentCreatorService.onSubmit();

    this.collectionService.getCollection('englishQuestion').subscribe( docData => {
      this.buttons = [];
      this.size =  docData.length;

      docData.forEach(doc => {
        this.buttons.push(doc.payload.doc.id);
      });
    });

    // this.exerciseService.getExercises().subscribe(data => {
    //   this.exercises = data.map( e => {
    //     const idData = e.payload.doc.id;
    //     const myData: any = e.payload.doc.data();
    //     return {
    //       id: idData,
    //       ...myData
    //     } as Exercise;
    //   });
    //
    //   this.map = this.exerciseMenuService.categorizeExerciseByUnit(this.exercises);
    //
    //
    //
    //   // this.map.forEach(value => {
    //   //   value.forEach(exercise => {
    //   //     this.documentCreatorService.onSubmit(exercise);
    //   //   });
    //   // });
    //
    //   // for (const key of this.map.keys()) {
    //   //   this.buttons.push(key);
    //   // }
    // });
  }

  addNewUnit() {
    this.isSaving = true;
    let counter = 1;
    console.log('creating new question');
    const questionId = this.size + 1;

    this.newExerciseService.createNewExercises(questionId);

    this.newExerciseService.exercises.forEach(exercise => {
      this.documentCreatorService.createNewExercise(exercise).then( res => {
        counter++;
        this.percentage = Math.round((counter / 40) * 100);
        if (exercise.id === questionId + '0410') {
          // this.buttons.push((this.size + 1) + '');
          this.buttons = [];
          this.documentCreatorService.setAField(exercise);
          this.isSaving = false;
        }
      });
    });
  }

  goToDetail(button: any) {
    console.log(button);
    this.router.navigate(['/unit', button]).then(r => console.log(r));
  }
}
