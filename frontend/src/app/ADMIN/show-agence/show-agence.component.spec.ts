import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAgenceComponent } from './show-agence.component';

describe('ShowAgenceComponent', () => {
  let component: ShowAgenceComponent;
  let fixture: ComponentFixture<ShowAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAgenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
