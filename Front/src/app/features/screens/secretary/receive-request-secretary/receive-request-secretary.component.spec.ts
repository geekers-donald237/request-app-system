import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveRequestSecretaryComponent } from './receive-request-secretary.component';

describe('ReceiveRequestSecretaryComponent', () => {
  let component: ReceiveRequestSecretaryComponent;
  let fixture: ComponentFixture<ReceiveRequestSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiveRequestSecretaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiveRequestSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
