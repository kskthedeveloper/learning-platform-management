import { Component, OnInit } from '@angular/core';
import {ExerciseMenuService} from '../../service/exercise-menu.service';
import {Exercise} from '../../models/exercise.model';
import {ExerciseService} from '../../service/exercise.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentCreatorService} from '../../service/document-creator.service';
import {CollectionService} from '../../service/collection.service';

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

  constructor(private exerciseService: ExerciseService,
              private exerciseMenuService: ExerciseMenuService,
              private documentCreatorService: DocumentCreatorService,
              private collectionService: CollectionService,
              private router: Router) { }

  ngOnInit() {
    // this.documentCreatorService.onSubmit();

    this.collectionService.getCollection('englishQuestion').subscribe( docData => {
      console.log(docData);
      for (let i = 1; i <= docData.length; i++) {
      }

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
    this.router.navigate(['/new-form']);
  }

  goToDetail(button: any) {
    console.log(button);
    this.router.navigate(['/unit', button]);
  }
}
