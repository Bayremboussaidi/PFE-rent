import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadAgenceComponent } from './head-agence.component';

describe('HeadAgenceComponent', () => {
  let component: HeadAgenceComponent;
  let fixture: ComponentFixture<HeadAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadAgenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
