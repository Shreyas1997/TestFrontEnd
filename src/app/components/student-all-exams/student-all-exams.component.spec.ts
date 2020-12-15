import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAllExamsComponent } from './student-all-exams.component';

describe('StudentAllExamsComponent', () => {
  let component: StudentAllExamsComponent;
  let fixture: ComponentFixture<StudentAllExamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAllExamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAllExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
