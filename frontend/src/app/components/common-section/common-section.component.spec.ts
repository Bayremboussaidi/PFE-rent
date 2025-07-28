import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSectionComponent } from './common-section.component';

describe('CommonSectionComponent', () => {
  let component: CommonSectionComponent;
  let fixture: ComponentFixture<CommonSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
