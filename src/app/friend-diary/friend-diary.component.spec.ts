import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendDiaryComponent } from './friend-diary.component';

describe('FriendDiaryComponent', () => {
  let component: FriendDiaryComponent;
  let fixture: ComponentFixture<FriendDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
