import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRequete2Component } from './liste-requete2.component';

describe('ListeRequete2Component', () => {
  let component: ListeRequete2Component;
  let fixture: ComponentFixture<ListeRequete2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeRequete2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeRequete2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
