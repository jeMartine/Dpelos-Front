import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEnfermedadComponent } from './crear-enfermedad.component';

describe('CrearEnfermedadComponent', () => {
  let component: CrearEnfermedadComponent;
  let fixture: ComponentFixture<CrearEnfermedadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEnfermedadComponent]
    });
    fixture = TestBed.createComponent(CrearEnfermedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
