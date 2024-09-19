import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDuenoComponent } from './crear-dueno.component';

describe('CrudDuenoComponent', () => {
  let component: CrudDuenoComponent;
  let fixture: ComponentFixture<CrudDuenoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudDuenoComponent]
    });
    fixture = TestBed.createComponent(CrudDuenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
