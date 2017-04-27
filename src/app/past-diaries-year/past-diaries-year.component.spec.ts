import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastDiariesYearComponent } from './past-diaries-year.component';

describe('PastDiariesYearComponent', () => {
  let component: PastDiariesYearComponent;
  let fixture: ComponentFixture<PastDiariesYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastDiariesYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastDiariesYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
