import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseMenuComponent } from './exercise-menu.component';

describe('ExerciseMenuComponent', () => {
  let component: ExerciseMenuComponent;
  let fixture: ComponentFixture<ExerciseMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
