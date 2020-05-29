import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileMapEditorComponent } from './tile-map-editor.component';

describe('TileEditorComponent', () => {
  let component: TileMapEditorComponent;
  let fixture: ComponentFixture<TileMapEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileMapEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileMapEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
