import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMarksComponent } from './get-marks.component';

describe('GetMarksComponent', () => {
  let component: GetMarksComponent;
  let fixture: ComponentFixture<GetMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
