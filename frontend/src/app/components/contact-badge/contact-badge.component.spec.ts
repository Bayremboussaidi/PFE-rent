import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBadgeComponent } from './contact-badge.component';

describe('ContactBadgeComponent', () => {
  let component: ContactBadgeComponent;
  let fixture: ComponentFixture<ContactBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
