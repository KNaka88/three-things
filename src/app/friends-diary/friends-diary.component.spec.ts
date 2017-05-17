import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsDiaryComponent } from './friends-diary.component';

describe('FriendsDiaryComponent', () => {
  let component: FriendsDiaryComponent;
  let fixture: ComponentFixture<FriendsDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
