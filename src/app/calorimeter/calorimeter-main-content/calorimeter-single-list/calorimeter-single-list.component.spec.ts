import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorimeterSingleListComponent } from './calorimeter-single-list.component';

describe('CalorimeterSingleListComponent', () => {
  let component: CalorimeterSingleListComponent;
  let fixture: ComponentFixture<CalorimeterSingleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalorimeterSingleListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalorimeterSingleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
