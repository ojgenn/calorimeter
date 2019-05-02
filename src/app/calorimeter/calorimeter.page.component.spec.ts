import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorimeterPageComponent } from './calorimeter.page.component';

describe('CalorimeterPageComponent', () => {
  let component: CalorimeterPageComponent;
  let fixture: ComponentFixture<CalorimeterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalorimeterPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents().catch();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalorimeterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
