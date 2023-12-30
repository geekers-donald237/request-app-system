import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorpanelComponent } from './colorpanel.component';

describe('ColorpanelComponent', () => {
  let component: ColorpanelComponent;
  let fixture: ComponentFixture<ColorpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorpanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
