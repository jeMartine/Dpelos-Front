import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerMolestiasComponent } from './banner-molestias.component';

describe('BannerMolestiasComponent', () => {
  let component: BannerMolestiasComponent;
  let fixture: ComponentFixture<BannerMolestiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerMolestiasComponent]
    });
    fixture = TestBed.createComponent(BannerMolestiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
