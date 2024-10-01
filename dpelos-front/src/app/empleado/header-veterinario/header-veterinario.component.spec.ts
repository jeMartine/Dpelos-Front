import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVeterinarioComponent } from './header-veterinario.component';

describe('HeaderVeterinarioComponent', () => {
  let component: HeaderVeterinarioComponent;
  let fixture: ComponentFixture<HeaderVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderVeterinarioComponent]
    });
    fixture = TestBed.createComponent(HeaderVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
