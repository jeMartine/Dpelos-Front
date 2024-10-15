import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTratamientosComponent } from './lista-tratamientos.component';

describe('ListaTratamientosComponent', () => {
  let component: ListaTratamientosComponent;
  let fixture: ComponentFixture<ListaTratamientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaTratamientosComponent]
    });
    fixture = TestBed.createComponent(ListaTratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
