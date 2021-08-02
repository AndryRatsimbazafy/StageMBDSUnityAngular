import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDataProgressSpinnerComponent } from './load-data-progress-spinner.component';

describe('LoadDataProgressSpinnerComponent', () => {
  let component: LoadDataProgressSpinnerComponent;
  let fixture: ComponentFixture<LoadDataProgressSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadDataProgressSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDataProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
