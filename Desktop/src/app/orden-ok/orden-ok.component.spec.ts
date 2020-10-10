import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenOkComponent } from './orden-ok.component';

describe('OrdenOkComponent', () => {
  let component: OrdenOkComponent;
  let fixture: ComponentFixture<OrdenOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
