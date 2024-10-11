import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVetComponent } from './lista-vet.component';

describe('ListaVetComponent', () => {
  let component: ListaVetComponent;
  let fixture: ComponentFixture<ListaVetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaVetComponent]
    });
    fixture = TestBed.createComponent(ListaVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
