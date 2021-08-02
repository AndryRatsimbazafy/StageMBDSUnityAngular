import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRediffConferenceComponent } from './modal-rediff-conference.component';

describe('ModalRediffConferenceComponent', () => {
  let component: ModalRediffConferenceComponent;
  let fixture: ComponentFixture<ModalRediffConferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRediffConferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRediffConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
