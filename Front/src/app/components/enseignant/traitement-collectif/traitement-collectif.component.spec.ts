import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementCollectifComponent } from './traitement-collectif.component';

describe('TraitementCollectifComponent', () => {
  let component: TraitementCollectifComponent;
  let fixture: ComponentFixture<TraitementCollectifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraitementCollectifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraitementCollectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
