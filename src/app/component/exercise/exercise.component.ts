import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exercise} from '../../models/exercise.model';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  // to change this one as Input

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onEdit: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  exercise: Exercise;

  constructor() { }

  ngOnInit(): void {
    // this.exercise = new Exercise('010101');
    // this.exercise.audio = 'Audio';
    // this.exercise.audioQuestion = 'AudioQuestion';
    // this.exercise.check = ['this', 'is', 'a', 'test'];
    // this.exercise.givenWords = ['this', '', 'a', 'test'];
    // this.exercise.img = 'ImgPath';
    // this.exercise.questions = ['this', 'is', 'a', 'test'];
  }

  emitOnEdit() {
    this.exercise.isEdit = !this.exercise.isEdit;
    this.onEdit.emit(this.exercise.isEdit);
  }

}
