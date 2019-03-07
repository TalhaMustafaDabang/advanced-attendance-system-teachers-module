import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAttendanceComponent } from './image-attendance.component';

describe('ImageAttendanceComponent', () => {
  let component: ImageAttendanceComponent;
  let fixture: ComponentFixture<ImageAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
