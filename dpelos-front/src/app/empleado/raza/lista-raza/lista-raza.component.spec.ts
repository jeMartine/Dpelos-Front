import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRazaComponent } from './lista-raza.component';

describe('ListaRazaComponent', () => {
  let component: ListaRazaComponent;
  let fixture: ComponentFixture<ListaRazaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaRazaComponent]
    });
    fixture = TestBed.createComponent(ListaRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
