import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRequestSecretaryComponent } from './show-request-secretary.component';

describe('ShowRequestSecretaryComponent', () => {
  let component: ShowRequestSecretaryComponent;
  let fixture: ComponentFixture<ShowRequestSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRequestSecretaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowRequestSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
