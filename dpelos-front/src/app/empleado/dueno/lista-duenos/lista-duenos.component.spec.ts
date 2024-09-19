import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDuenosComponent } from './lista-duenos.component';

describe('ListaDuenosComponent', () => {
  let component: ListaDuenosComponent;
  let fixture: ComponentFixture<ListaDuenosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDuenosComponent]
    });
    fixture = TestBed.createComponent(ListaDuenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
