import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsAgenceComponent } from './car-details-agence.component';

describe('CarDetailsAgenceComponent', () => {
  let component: CarDetailsAgenceComponent;
  let fixture: ComponentFixture<CarDetailsAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarDetailsAgenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailsAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
