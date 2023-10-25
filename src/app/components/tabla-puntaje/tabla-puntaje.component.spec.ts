import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPuntajeComponent } from './tabla-puntaje.component';

describe('TablaPuntajeComponent', () => {
  let component: TablaPuntajeComponent;
  let fixture: ComponentFixture<TablaPuntajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaPuntajeComponent]
    });
    fixture = TestBed.createComponent(TablaPuntajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
