import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequeteCollectiveComponent } from './requete-collective.component';

describe('RequeteCollectiveComponent', () => {
  let component: RequeteCollectiveComponent;
  let fixture: ComponentFixture<RequeteCollectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequeteCollectiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequeteCollectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
