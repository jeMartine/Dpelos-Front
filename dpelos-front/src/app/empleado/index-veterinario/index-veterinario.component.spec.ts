import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexVeterinarioComponent } from './index-veterinario.component';

describe('IndexVeterinarioComponent', () => {
  let component: IndexVeterinarioComponent;
  let fixture: ComponentFixture<IndexVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexVeterinarioComponent]
    });
    fixture = TestBed.createComponent(IndexVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
