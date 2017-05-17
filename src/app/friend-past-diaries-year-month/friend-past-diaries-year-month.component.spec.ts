import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendPastDiariesYearMonthComponent } from './friend-past-diaries-year-month.component';

describe('FriendPastDiariesYearMonthComponent', () => {
  let component: FriendPastDiariesYearMonthComponent;
  let fixture: ComponentFixture<FriendPastDiariesYearMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendPastDiariesYearMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendPastDiariesYearMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
