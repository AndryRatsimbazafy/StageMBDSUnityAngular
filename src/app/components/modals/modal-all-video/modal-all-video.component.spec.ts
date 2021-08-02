import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAllVideoComponent } from './modal-all-video.component';

describe('ModalAllVideoComponent', () => {
  let component: ModalAllVideoComponent;
  let fixture: ComponentFixture<ModalAllVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAllVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAllVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
