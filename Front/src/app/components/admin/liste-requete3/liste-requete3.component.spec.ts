import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRequete3Component } from './liste-requete3.component';

describe('ListeRequete3Component', () => {
  let component: ListeRequete3Component;
  let fixture: ComponentFixture<ListeRequete3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeRequete3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeRequete3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
