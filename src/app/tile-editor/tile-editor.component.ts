import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {TileComponent} from '../tile/tile.component';

@Component({
  selector: 'app-tile-editor',
  templateUrl: './tile-editor.component.html',
  styleUrls: ['./tile-editor.component.css']
})
export class TileEditorComponent implements OnInit, OnChanges {
  @Input('tile') sourceTile: TileComponent;

  @ViewChild(TileComponent) tile: TileComponent;

  scale = 8;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.tile) {
      this.tile.pixels = this.sourceTile.pixels;
    }
  }

  formatLabel(value: number) {
    return `${value}x`;
  }

}
