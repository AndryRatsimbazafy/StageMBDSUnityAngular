import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChoixSceneComponent } from './modal-choix-scene.component';

describe('ModalChoixSceneComponent', () => {
  let component: ModalChoixSceneComponent;
  let fixture: ComponentFixture<ModalChoixSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChoixSceneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChoixSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
