import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteSwatchComponent } from './palette-swatch.component';

describe('PaletteSwatchComponent', () => {
  let component: PaletteSwatchComponent;
  let fixture: ComponentFixture<PaletteSwatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletteSwatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteSwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
