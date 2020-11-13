import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourBlockTableComponent } from './hour-block-table.component';

describe('HourBlockTableComponent', () => {
  let component: HourBlockTableComponent;
  let fixture: ComponentFixture<HourBlockTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourBlockTableComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourBlockTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
