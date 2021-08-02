import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TobuildComponent } from './tobuild.component';

describe('TobuildComponent', () => {
  let component: TobuildComponent;
  let fixture: ComponentFixture<TobuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TobuildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TobuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
