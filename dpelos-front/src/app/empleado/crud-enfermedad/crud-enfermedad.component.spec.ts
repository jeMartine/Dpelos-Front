import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEnfermedadComponent } from './crud-enfermedad.component';

describe('CrudEnfermedadComponent', () => {
  let component: CrudEnfermedadComponent;
  let fixture: ComponentFixture<CrudEnfermedadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudEnfermedadComponent]
    });
    fixture = TestBed.createComponent(CrudEnfermedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
