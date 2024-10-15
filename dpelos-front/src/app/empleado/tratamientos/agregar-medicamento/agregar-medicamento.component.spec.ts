import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMedicamentoComponent } from './agregar-medicamento.component';

describe('AgregarMedicamentoComponent', () => {
  let component: AgregarMedicamentoComponent;
  let fixture: ComponentFixture<AgregarMedicamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarMedicamentoComponent]
    });
    fixture = TestBed.createComponent(AgregarMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
