import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertEnseignantComponent } from './transfert-enseignant.component';

describe('TransfertEnseignantComponent', () => {
  let component: TransfertEnseignantComponent;
  let fixture: ComponentFixture<TransfertEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfertEnseignantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransfertEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
