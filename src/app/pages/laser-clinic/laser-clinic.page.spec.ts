import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaserClinicPage } from './laser-clinic.page';

describe('LaserClinicPage', () => {
  let component: LaserClinicPage;
  let fixture: ComponentFixture<LaserClinicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaserClinicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaserClinicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
