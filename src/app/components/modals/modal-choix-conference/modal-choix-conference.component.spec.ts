import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChoixConferenceComponent } from './modal-choix-conference.component';

describe('ModalChoixConferenceComponent', () => {
  let component: ModalChoixConferenceComponent;
  let fixture: ComponentFixture<ModalChoixConferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChoixConferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChoixConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
