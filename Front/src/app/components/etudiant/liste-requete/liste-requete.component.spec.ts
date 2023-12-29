import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRequeteComponent } from './liste-requete.component';

describe('ListeRequeteComponent', () => {
  let component: ListeRequeteComponent;
  let fixture: ComponentFixture<ListeRequeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeRequeteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeRequeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
