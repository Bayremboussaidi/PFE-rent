import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAgenceComponent } from './contact-agence.component';

describe('ContactAgenceComponent', () => {
  let component: ContactAgenceComponent;
  let fixture: ComponentFixture<ContactAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactAgenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
