import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeAdminComponent } from './programme-admin.component';

describe('ProgrammeAdminComponent', () => {
  let component: ProgrammeAdminComponent;
  let fixture: ComponentFixture<ProgrammeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgrammeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
