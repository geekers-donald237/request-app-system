import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertEtudiantComponent } from './transfert-etudiant.component';

describe('TransfertEtudiantComponent', () => {
  let component: TransfertEtudiantComponent;
  let fixture: ComponentFixture<TransfertEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfertEtudiantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransfertEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
