import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencelayoutComponent } from './agencelayout.component';

describe('AgencelayoutComponent', () => {
  let component: AgencelayoutComponent;
  let fixture: ComponentFixture<AgencelayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencelayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencelayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
