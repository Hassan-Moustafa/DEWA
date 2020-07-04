import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallingPopupComponent } from './calling-popup.component';

describe('CallingPopupComponent', () => {
  let component: CallingPopupComponent;
  let fixture: ComponentFixture<CallingPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallingPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
