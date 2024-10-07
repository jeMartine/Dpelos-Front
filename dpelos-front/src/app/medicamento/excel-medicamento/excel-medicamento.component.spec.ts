import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelMedicamentoComponent } from './excel-medicamento.component';

describe('ExcelMedicamentoComponent', () => {
  let component: ExcelMedicamentoComponent;
  let fixture: ComponentFixture<ExcelMedicamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelMedicamentoComponent]
    });
    fixture = TestBed.createComponent(ExcelMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
