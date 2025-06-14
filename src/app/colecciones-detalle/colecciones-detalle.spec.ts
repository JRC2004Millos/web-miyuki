import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColeccionesDetalle } from './colecciones-detalle';

describe('ColeccionesDetalle', () => {
  let component: ColeccionesDetalle;
  let fixture: ComponentFixture<ColeccionesDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColeccionesDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColeccionesDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
