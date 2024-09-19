import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRazaComponent } from './crud-raza.component';

describe('CrudRazaComponent', () => {
  let component: CrudRazaComponent;
  let fixture: ComponentFixture<CrudRazaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudRazaComponent]
    });
    fixture = TestBed.createComponent(CrudRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
