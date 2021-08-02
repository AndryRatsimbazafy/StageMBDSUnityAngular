import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEngieComponent } from './modal-engie.component';

describe('ModalEngieComponent', () => {
  let component: ModalEngieComponent;
  let fixture: ComponentFixture<ModalEngieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEngieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEngieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
