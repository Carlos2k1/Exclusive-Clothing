import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoupasPage } from './roupas.page';

describe('RoupasPage', () => {
  let component: RoupasPage;
  let fixture: ComponentFixture<RoupasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoupasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoupasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
