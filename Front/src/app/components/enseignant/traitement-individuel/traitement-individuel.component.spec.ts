import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementIndividuelComponent } from './traitement-individuel.component';

describe('TraitementIndividuelComponent', () => {
  let component: TraitementIndividuelComponent;
  let fixture: ComponentFixture<TraitementIndividuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraitementIndividuelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraitementIndividuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
