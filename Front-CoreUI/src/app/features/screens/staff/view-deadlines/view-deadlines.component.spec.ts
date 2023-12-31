import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeadlinesComponent } from './view-deadlines.component';

describe('ViewDeadlinesComponent', () => {
  let component: ViewDeadlinesComponent;
  let fixture: ComponentFixture<ViewDeadlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDeadlinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDeadlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
