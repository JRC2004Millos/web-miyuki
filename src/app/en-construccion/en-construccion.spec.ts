import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnConstruccion } from './en-construccion';

describe('EnConstruccion', () => {
  let component: EnConstruccion;
  let fixture: ComponentFixture<EnConstruccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnConstruccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnConstruccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
