import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatematicasComponent } from './matematicas.component';

describe('MatematicasComponent', () => {
  let component: MatematicasComponent;
  let fixture: ComponentFixture<MatematicasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatematicasComponent]
    });
    fixture = TestBed.createComponent(MatematicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
