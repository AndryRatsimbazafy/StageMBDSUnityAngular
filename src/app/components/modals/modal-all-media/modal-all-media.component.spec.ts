import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAllMediaComponent } from './modal-all-media.component';

describe('ModalAllMediaComponent', () => {
  let component: ModalAllMediaComponent;
  let fixture: ComponentFixture<ModalAllMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAllMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAllMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
