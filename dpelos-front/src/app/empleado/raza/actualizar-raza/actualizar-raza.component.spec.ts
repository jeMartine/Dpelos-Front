import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRazaComponent } from './actualizar-raza.component';

describe('ActualizarRazaComponent', () => {
  let component: ActualizarRazaComponent;
  let fixture: ComponentFixture<ActualizarRazaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarRazaComponent]
    });
    fixture = TestBed.createComponent(ActualizarRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
