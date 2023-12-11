import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivisRequeteComponent } from './suivis-requete.component';

describe('SuivisRequeteComponent', () => {
  let component: SuivisRequeteComponent;
  let fixture: ComponentFixture<SuivisRequeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuivisRequeteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuivisRequeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
