import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditQuestionsComponent } from './admin-edit-questions.component';

describe('AdminEditQuestionsComponent', () => {
  let component: AdminEditQuestionsComponent;
  let fixture: ComponentFixture<AdminEditQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
