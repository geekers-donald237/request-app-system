import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRequestStudentComponent } from './show-request-student.component';

describe('ShowRequestStudentComponent', () => {
  let component: ShowRequestStudentComponent;
  let fixture: ComponentFixture<ShowRequestStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRequestStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowRequestStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
