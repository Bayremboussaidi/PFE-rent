import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserADetailsComponent } from './user-a-details.component';

describe('UserADetailsComponent', () => {
  let component: UserADetailsComponent;
  let fixture: ComponentFixture<UserADetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserADetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserADetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
