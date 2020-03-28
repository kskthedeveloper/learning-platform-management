import { Component, OnInit } from '@angular/core';
import {NewExerciseService} from '../../service/new-exercise.service';
import {Exercise} from '../../models/exercise.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})
export class NewExerciseComponent implements OnInit {
  exercises: Exercise[];
  exerciseForms: FormGroup[] = new Array();

  constructor(private newExerciseService: NewExerciseService,
              private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.newExerciseService.createNewExercises();
    this.exercises = this.newExerciseService.exercises;

    this.exercises.forEach((exercise) => {
      this.exerciseForms.push(this.generateForm(exercise));
    });

    console.log(this.exerciseForms[0].controls);
  }

  generateForm(exercise: Exercise): FormGroup {
    return this.fb.group({
      id: exercise.id,
      audio: exercise.audio ?? '',
      check: exercise.check ?? '',
      givenWords: exercise.givenWords ?? '',
      img: exercise.img ?? '',
      questions: exercise.questions ?? '',
      isEdit: exercise.isEdit ?? false
    });
  }

  toggle(exerciseForm: any) {
    console.log(exerciseForm.controls.isEdit);
    exerciseForm.controls.isEdit.setValue(!exerciseForm.controls.isEdit.value);
  }

  onEditEvent(event, exercise, exerciseForm) {
    exercise.isEdit = event;
    exerciseForm.controls.isEdit.setValue(event);
  }

  onEdit(exercise: Exercise, exerciseForm) {
    exercise.isEdit = exercise.isEdit;
    exerciseForm.controls.isEdit.setValue(!exerciseForm.controls.isEdit.value);
  }


}
