import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndividualRequestComponent } from './add-individual-request.component';

describe('AddIndividualRequestComponent', () => {
  let component: AddIndividualRequestComponent;
  let fixture: ComponentFixture<AddIndividualRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIndividualRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIndividualRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
