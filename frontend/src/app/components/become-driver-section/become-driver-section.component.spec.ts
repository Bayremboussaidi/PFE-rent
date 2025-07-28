import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeDriverSectionComponent } from './become-driver-section.component';

describe('BecomeDriverSectionComponent', () => {
  let component: BecomeDriverSectionComponent;
  let fixture: ComponentFixture<BecomeDriverSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BecomeDriverSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeDriverSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
