import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentReportComponent } from './admin-student-report.component';

describe('AdminStudentReportComponent', () => {
  let component: AdminStudentReportComponent;
  let fixture: ComponentFixture<AdminStudentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
