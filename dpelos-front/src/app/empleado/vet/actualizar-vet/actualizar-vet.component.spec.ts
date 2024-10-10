import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarVetComponent } from './actualizar-vet.component';

describe('ActualizarVetComponent', () => {
  let component: ActualizarVetComponent;
  let fixture: ComponentFixture<ActualizarVetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarVetComponent]
    });
    fixture = TestBed.createComponent(ActualizarVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
