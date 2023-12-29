import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProgrammesComponent } from './ajout-programmes.component';

describe('AjoutProgrammesComponent', () => {
  let component: AjoutProgrammesComponent;
  let fixture: ComponentFixture<AjoutProgrammesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutProgrammesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
