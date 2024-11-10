import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMedComponent } from './lista-med.component';

describe('ListaMedComponent', () => {
  let component: ListaMedComponent;
  let fixture: ComponentFixture<ListaMedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaMedComponent]
    });
    fixture = TestBed.createComponent(ListaMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
