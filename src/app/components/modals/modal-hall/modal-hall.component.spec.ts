import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHallComponent } from './modal-hall.component';

describe('ModalHallComponent', () => {
  let component: ModalHallComponent;
  let fixture: ComponentFixture<ModalHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
