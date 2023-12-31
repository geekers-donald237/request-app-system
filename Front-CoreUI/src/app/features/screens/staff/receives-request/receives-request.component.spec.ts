import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivesRequestComponent } from './receives-request.component';

describe('ReceivesRequestComponent', () => {
  let component: ReceivesRequestComponent;
  let fixture: ComponentFixture<ReceivesRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivesRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceivesRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
