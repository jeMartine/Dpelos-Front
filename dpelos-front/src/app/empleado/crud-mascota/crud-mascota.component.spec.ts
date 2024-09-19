import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMascotaComponent } from './crud-mascota.component';

describe('CrudMascotaComponent', () => {
  let component: CrudMascotaComponent;
  let fixture: ComponentFixture<CrudMascotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudMascotaComponent]
    });
    fixture = TestBed.createComponent(CrudMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
