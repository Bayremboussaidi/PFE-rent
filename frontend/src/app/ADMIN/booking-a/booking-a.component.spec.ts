import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAComponent } from './booking-a.component';

describe('BookingAComponent', () => {
  let component: BookingAComponent;
  let fixture: ComponentFixture<BookingAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
