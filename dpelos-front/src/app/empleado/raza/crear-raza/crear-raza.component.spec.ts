import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRazaComponent } from './crear-raza.component';

describe('CrearRazaComponent', () => {
  let component: CrearRazaComponent;
  let fixture: ComponentFixture<CrearRazaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearRazaComponent]
    });
    fixture = TestBed.createComponent(CrearRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
