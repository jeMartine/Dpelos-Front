import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVetComponent } from './editar-vet.component';

describe('EditarVetComponent', () => {
  let component: EditarVetComponent;
  let fixture: ComponentFixture<EditarVetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarVetComponent]
    });
    fixture = TestBed.createComponent(EditarVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
