import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVetComponent } from './crear-vet.component';

describe('CrearVetComponent', () => {
  let component: CrearVetComponent;
  let fixture: ComponentFixture<CrearVetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearVetComponent]
    });
    fixture = TestBed.createComponent(CrearVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
