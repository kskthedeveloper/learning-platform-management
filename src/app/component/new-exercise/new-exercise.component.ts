import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewExerciseService} from '../../service/new-exercise.service';
import {Exercise} from '../../models/exercise.model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {element} from 'protractor';
import {FileUploadService} from '../../service/file-upload.service';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {ExerciseService} from '../../service/exercise.service';
import {CollectionService} from '../../service/collection.service';
import {DocumentCreatorService} from '../../service/document-creator.service';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})
export class NewExerciseComponent implements OnInit {
  @Input() unitId: string;
  @Input() exerciseId: string;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  exercises: Exercise[] = new Array();
  exerciseForms: FormGroup[] = new Array();

  uploadPercent: Observable<number>;
  uploadAudioPercent: Observable<number>;
  uploadAudioQuestionPercent: Observable<number>;
  downloadURL: Observable<string>;
  fileUrl: Observable<string | null>;
  loading = false;

  filePath: string;


  constructor(private newExerciseService: NewExerciseService,
              private exerciseService: ExerciseService,
              private fb: FormBuilder,
              private fileUploadService: FileUploadService,
              private documentCreatorService: DocumentCreatorService,
              private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    // get exercise from firebase


    this.exerciseService.getExerciseById(this.exerciseId, this.unitId).subscribe( data => {
      data.forEach( question => {
        this.exerciseService.getQuestionById(this.exerciseId, this.unitId, question.payload.doc.id).subscribe(exercise => {
          const myData: any = exercise.payload.data();
          this.exercises.push({isEdit: false, ...myData} as Exercise);
          this.exerciseForms.push(this.generateForm({isEdit: false, ...myData} as Exercise));
        });
      });
    });
    // console.log(this.exerciseForms[0].controls);
  }

  generateForm(exercise: Exercise): FormGroup {
    return this.fb.group({
      id: exercise.id,
      audio: exercise.audio ?? '',
      audioQuestion: exercise.audioQuestion ?? '',
      check: this.fb.array([
        ...this.bindList(exercise.check, true)
      ]),
      givenWords: this.fb.array([
        ...this.bindList(exercise.givenWords, true)
      ]),
      img: exercise.img ?? '',
      questions: this.fb.array([
        ...this.bindList(exercise.questions, false)
      ]),
      isEdit: exercise.isEdit ?? false
    });
  }

  checkList(exerciseForm) {
    return exerciseForm.get('check') as FormArray;
  }

  addCheck(exerciseForm) {
    this.checkList(exerciseForm)
        .push(this.fb.control(''));
  }

  removeCheck(exerciseForm: FormGroup, index: number) {
    this.checkList(exerciseForm).removeAt(index);
  }

  bindList(elements: string[], isRequired: boolean): FormControl[] {
    const formControls = new Array();

    for (const ele of elements) {
      if (isRequired) {
        formControls.push(this.fb.control(ele, Validators.required));
      } else {
        formControls.push(this.fb.control(ele));
      }
    }

    return formControls;
  }

  givenWordList(exerciseForm) {
    return exerciseForm.get('givenWords') as FormArray;
  }

  addGivenWord(exerciseForm) {
    this.givenWordList(exerciseForm)
        .push(this.fb.control(''));
  }

  removeGivenWord(exerciseForm: FormGroup, index: number) {
    this.givenWordList(exerciseForm).removeAt(index);
  }

  questionList(exerciseForm) {
    return exerciseForm.get('questions') as FormArray;
  }

  addQuestion(exerciseForm) {
    this.questionList(exerciseForm)
      .push(this.fb.control(''));
  }

  removeQuestion(exerciseForm: FormGroup, index: number) {
    this.questionList(exerciseForm).removeAt(index);
  }

  toggle(exerciseForm: any) {
    exerciseForm.controls.isEdit.setValue(!exerciseForm.controls.isEdit.value);
  }

  onEditEvent(event, exercise, exerciseForm) {
    exercise.isEdit = event;
    exerciseForm.controls.isEdit.setValue(event);
  }

  onEdit(exercise: Exercise, exerciseForm) {
    exerciseForm.controls.isEdit.setValue(!exerciseForm.controls.isEdit.value);
  }

  uploadImage(event, exerciseForm) {
    this.uploadFile('picture', event, exerciseForm);
    // this.fileUploadService.downloadURL.subscribe((data) => {
    //   console.log('Uploading finished ', data);
    //   this.downloadURL = data;
    // });
  }

  uploadAudio(event, exerciseForm) {
    this.uploadFile('audio', event, exerciseForm);
  }

  uploadAudioQuestion(event, exerciseForm) {
    this.uploadFile('audioQuestion', event, exerciseForm);
  }


  // to refactor this file upload service
  uploadFile(filePath: string, event, exerciseForm) {
    const file = event.target.files[0];
    const task = this.storage.upload(filePath + '/' + file.name, file);
    const fileRef = this.storage.ref(filePath + '/' + file.name);

    if (filePath === 'picture') {
      this.uploadPercent = task.percentageChanges();
    }

    if (filePath === 'audio') {
      this.uploadAudioPercent = task.percentageChanges();
    }

    if (filePath === 'audioQuestion') {
      this.uploadAudioQuestionPercent = task.percentageChanges();
    }

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        console.log('Finishing upload ', this.downloadURL);
        this.downloadURL.subscribe((data) => {
          if (filePath === 'picture') {
            exerciseForm.controls.img.setValue(data);
          }
          if (filePath === 'audio') {
            exerciseForm.controls.audio.setValue(data);
          }
          if (filePath === 'audioQuestion') {
            exerciseForm.controls.audioQuestion.setValue(data);
          }
        });
      })
    ).subscribe();
  }

  downloadFile(filePath: string, fileName: string) {
    const ref = this.storage.ref(filePath + '/' + fileName);
    this.fileUrl = ref.getDownloadURL();
  }

  saveExercise(exerciseForm: FormGroup) {
    if (exerciseForm.status === 'INVALID') { return; }

    const toSave: Exercise = exerciseForm.value;
    delete toSave.isEdit;
    this.loading = true;


    this.documentCreatorService.createExercise(toSave).then(res => {
      this.loading = false;
      this.toggle(exerciseForm);
    });

  }



}
