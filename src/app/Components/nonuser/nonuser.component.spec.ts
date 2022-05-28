import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonuserComponent } from './nonuser.component';

describe('NonuserComponent', () => {
  let component: NonuserComponent;
  let fixture: ComponentFixture<NonuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
