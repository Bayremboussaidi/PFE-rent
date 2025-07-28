import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardetailsAComponent } from './cardetails-a.component';

describe('CardetailsAComponentComponent', () => {
  let component: CardetailsAComponent;
  let fixture: ComponentFixture<CardetailsAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardetailsAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardetailsAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
