import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIndividuelComponent } from './list-individuel.component';

describe('ListIndividuelComponent', () => {
  let component: ListIndividuelComponent;
  let fixture: ComponentFixture<ListIndividuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListIndividuelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListIndividuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
