import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceRedifComponent } from './conference-redif.component';

describe('ConferenceRedifComponent', () => {
  let component: ConferenceRedifComponent;
  let fixture: ComponentFixture<ConferenceRedifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConferenceRedifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceRedifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
