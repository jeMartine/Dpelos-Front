import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEnfermedadComponent } from './actualizar-enfermedad.component';

describe('ActualizarEnfermedadComponent', () => {
  let component: ActualizarEnfermedadComponent;
  let fixture: ComponentFixture<ActualizarEnfermedadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarEnfermedadComponent]
    });
    fixture = TestBed.createComponent(ActualizarEnfermedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
