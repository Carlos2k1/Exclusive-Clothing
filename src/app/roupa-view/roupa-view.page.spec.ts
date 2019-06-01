import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoupaViewPage } from './roupa-view.page';

describe('RoupaViewPage', () => {
  let component: RoupaViewPage;
  let fixture: ComponentFixture<RoupaViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoupaViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoupaViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
