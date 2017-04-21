import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingConfirmationComponent } from './waiting-confirmation.component';

describe('WaitingConfirmationComponent', () => {
  let component: WaitingConfirmationComponent;
  let fixture: ComponentFixture<WaitingConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
