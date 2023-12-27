import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirRequeteComponent } from './voir-requete.component';

describe('VoirRequeteComponent', () => {
  let component: VoirRequeteComponent;
  let fixture: ComponentFixture<VoirRequeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoirRequeteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoirRequeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
