import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColeccionesMenu } from './colecciones-menu';

describe('ColeccionesMenu', () => {
  let component: ColeccionesMenu;
  let fixture: ComponentFixture<ColeccionesMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColeccionesMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColeccionesMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
