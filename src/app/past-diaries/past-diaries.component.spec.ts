import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastDiariesComponent } from './past-diaries.component';

describe('PastDiariesComponent', () => {
  let component: PastDiariesComponent;
  let fixture: ComponentFixture<PastDiariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastDiariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastDiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
