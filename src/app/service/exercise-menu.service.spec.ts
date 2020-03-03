import { TestBed } from '@angular/core/testing';

import { ExerciseMenuService } from './exercise-menu.service';

describe('ExerciseMenuService', () => {
  let service: ExerciseMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
