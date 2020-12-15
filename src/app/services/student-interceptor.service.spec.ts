import { TestBed } from '@angular/core/testing';

import { StudentInterceptorService } from './student-interceptor.service';

describe('StudentInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentInterceptorService = TestBed.get(StudentInterceptorService);
    expect(service).toBeTruthy();
  });
});
