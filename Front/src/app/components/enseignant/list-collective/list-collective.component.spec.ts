import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCollectiveComponent } from './list-collective.component';

describe('ListCollectiveComponent', () => {
  let component: ListCollectiveComponent;
  let fixture: ComponentFixture<ListCollectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCollectiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCollectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
