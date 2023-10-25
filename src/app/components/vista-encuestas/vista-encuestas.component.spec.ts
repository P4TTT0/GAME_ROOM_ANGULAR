import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEncuestasComponent } from './vista-encuestas.component';

describe('VistaEncuestasComponent', () => {
  let component: VistaEncuestasComponent;
  let fixture: ComponentFixture<VistaEncuestasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaEncuestasComponent]
    });
    fixture = TestBed.createComponent(VistaEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
