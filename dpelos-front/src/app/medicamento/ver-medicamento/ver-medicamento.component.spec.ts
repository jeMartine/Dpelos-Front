import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMedicamentoComponent } from './ver-medicamento.component';

describe('VerMedicamentoComponent', () => {
  let component: VerMedicamentoComponent;
  let fixture: ComponentFixture<VerMedicamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerMedicamentoComponent]
    });
    fixture = TestBed.createComponent(VerMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
