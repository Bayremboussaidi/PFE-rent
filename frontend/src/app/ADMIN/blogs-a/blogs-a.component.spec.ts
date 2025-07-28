import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsAComponent } from './blogs-a.component';

describe('BlogsAComponent', () => {
  let component: BlogsAComponent;
  let fixture: ComponentFixture<BlogsAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogsAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
