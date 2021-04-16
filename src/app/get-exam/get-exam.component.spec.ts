import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetExamComponent } from './get-exam.component';

describe('GetExamComponent', () => {
  let component: GetExamComponent;
  let fixture: ComponentFixture<GetExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
