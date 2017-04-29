import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentDiariesComponent } from './recent-diaries.component';

describe('RecentDiariesComponent', () => {
  let component: RecentDiariesComponent;
  let fixture: ComponentFixture<RecentDiariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentDiariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentDiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
