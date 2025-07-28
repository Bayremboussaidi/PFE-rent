import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetaComponent } from './car-deta.component';

describe('CarDetaComponent', () => {
  let component: CarDetaComponent;
  let fixture: ComponentFixture<CarDetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarDetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
