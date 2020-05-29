import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TileComponent} from '../tile/tile.component';
import {Tile} from '../datamodels/tile.model';
import {PixelValue} from '../datamodels/pixel-value.model';

@Component({
  selector: 'app-tile-editor',
  templateUrl: './tile-editor.component.html',
  styleUrls: ['./tile-editor.component.css']
})
export class TileEditorComponent implements OnInit {
  @Input() sourceTile: Tile;
  @Output() tileChanged = new EventEmitter<Tile>();

  @ViewChild(TileComponent) tileComponent: TileComponent;

  scale = 20;

  constructor() { }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    return `${value}x`;
  }

  changePixel(pixelData: PixelValue[]) {
    this.tileChanged.emit({ pixels: pixelData });
  }

}
