import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequeteIndividuelComponent } from './requete-individuel.component';

describe('RequeteIndividuelComponent', () => {
  let component: RequeteIndividuelComponent;
  let fixture: ComponentFixture<RequeteIndividuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequeteIndividuelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequeteIndividuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
