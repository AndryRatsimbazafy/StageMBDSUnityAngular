import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVideoEngieComponent } from './modal-video-engie.component';

describe('ModalVideoEngieComponent', () => {
  let component: ModalVideoEngieComponent;
  let fixture: ComponentFixture<ModalVideoEngieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVideoEngieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVideoEngieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
