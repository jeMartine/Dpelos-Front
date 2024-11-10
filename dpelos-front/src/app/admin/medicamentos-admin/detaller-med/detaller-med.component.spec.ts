import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallerMedComponent } from './detaller-med.component';

describe('DetallerMedComponent', () => {
  let component: DetallerMedComponent;
  let fixture: ComponentFixture<DetallerMedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallerMedComponent]
    });
    fixture = TestBed.createComponent(DetallerMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
