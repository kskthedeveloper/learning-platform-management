import { TestBed } from '@angular/core/testing';

import { NewExerciseService } from './new-exercise.service';

describe('NewExerciseService', () => {
  let service: NewExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
