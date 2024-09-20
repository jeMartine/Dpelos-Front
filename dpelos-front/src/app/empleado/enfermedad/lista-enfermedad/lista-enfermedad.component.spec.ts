import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEnfermedadComponent } from './lista-enfermedad.component';

describe('ListaEnfermedadComponent', () => {
  let component: ListaEnfermedadComponent;
  let fixture: ComponentFixture<ListaEnfermedadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEnfermedadComponent]
    });
    fixture = TestBed.createComponent(ListaEnfermedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
