import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PixelValue} from '../datamodels/pixel-value.model';
import {PixelColor} from '../datamodels/pixel-color.model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() scale: number;
  @Input() editing = false;
  @Input() pixelData: PixelValue[];

  @Output() pixelChanged = new EventEmitter<PixelValue[]>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getColor(n: PixelValue) {
    switch(n) {
      case PixelValue.WHITE:
        return PixelColor.WHITE;
      case PixelValue.LIGHT_GRAY:
        return PixelColor.LIGHT_GRAY;
      case PixelValue.DARK_GRAY:
        return PixelColor.DARK_GRAY;
      case PixelValue.BLACK:
        return PixelColor.BLACK;
      default:
        return PixelColor.BLACK;
    }
  }

  modifyPixel(index: number) {
    this.pixelData[index] = Math.floor(Math.random() * 4);
    this.pixelChanged.emit(this.pixelData);
  }
}
