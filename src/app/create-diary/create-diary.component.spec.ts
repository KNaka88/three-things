import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiaryComponent } from './create-diary.component';

describe('CreateDiaryComponent', () => {
  let component: CreateDiaryComponent;
  let fixture: ComponentFixture<CreateDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
