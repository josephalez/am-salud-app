import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociadosPage } from './asociados.page';

describe('AsociadosPage', () => {
  let component: AsociadosPage;
  let fixture: ComponentFixture<AsociadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
