import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeEnseignantComponent } from './programme-enseignant.component';

describe('ProgrammeEnseignantComponent', () => {
  let component: ProgrammeEnseignantComponent;
  let fixture: ComponentFixture<ProgrammeEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeEnseignantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgrammeEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
