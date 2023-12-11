import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeEtudiantComponent } from './programme-etudiant.component';

describe('ProgrammeEtudiantComponent', () => {
  let component: ProgrammeEtudiantComponent;
  let fixture: ComponentFixture<ProgrammeEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeEtudiantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgrammeEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
