import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastDiariesYearMonthComponent } from './past-diaries-year-month.component';

describe('PastDiariesYearMonthComponent', () => {
  let component: PastDiariesYearMonthComponent;
  let fixture: ComponentFixture<PastDiariesYearMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastDiariesYearMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastDiariesYearMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
