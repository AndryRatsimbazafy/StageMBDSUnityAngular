import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHallEngieComponent } from './modal-hall-engie.component';

describe('ModalHallEngieComponent', () => {
  let component: ModalHallEngieComponent;
  let fixture: ComponentFixture<ModalHallEngieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHallEngieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHallEngieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
