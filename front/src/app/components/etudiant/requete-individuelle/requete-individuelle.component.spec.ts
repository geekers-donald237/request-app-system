import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequeteIndividuelleComponent } from './requete-individuelle.component';

describe('RequeteIndividuelleComponent', () => {
  let component: RequeteIndividuelleComponent;
  let fixture: ComponentFixture<RequeteIndividuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequeteIndividuelleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequeteIndividuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
