import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedVoitureListComponent } from './featured-voiture-list.component';

describe('FeaturedVoitureListComponent', () => {
  let component: FeaturedVoitureListComponent;
  let fixture: ComponentFixture<FeaturedVoitureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedVoitureListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedVoitureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
