import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListAComponent } from './car-list-a.component';

describe('CarListAComponent', () => {
  let component: CarListAComponent;
  let fixture: ComponentFixture<CarListAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarListAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarListAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
