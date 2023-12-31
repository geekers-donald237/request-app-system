import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupRequestComponent } from './add-group-request.component';

describe('AddGroupRequestComponent', () => {
  let component: AddGroupRequestComponent;
  let fixture: ComponentFixture<AddGroupRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGroupRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGroupRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
