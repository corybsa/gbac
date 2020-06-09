import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PixelValue} from '../datamodels/pixel-value.model';
import {PixelColor} from '../datamodels/pixel-color.model';

interface MonochromePalette {
  color0: PixelValue;
  color1: PixelValue;
  color2: PixelValue;
  color3: PixelValue;
}

interface ColorPalette {

}

@Component({
  selector: 'app-palette-swatch',
  templateUrl: './palette-swatch.component.html',
  styleUrls: ['./palette-swatch.component.css']
})
export class PaletteSwatchComponent implements OnInit {
  monoPalette: MonochromePalette;

  @Output() colorSelected: EventEmitter<PixelValue>;

  constructor() {
    this.colorSelected = new EventEmitter<PixelValue>();

    this.monoPalette = {
      color0: PixelValue.WHITE,
      color1: PixelValue.LIGHT_GRAY,
      color2: PixelValue.DARK_GRAY,
      color3: PixelValue.BLACK
    };
  }

  ngOnInit(): void {
  }

  /**
   * Gets color from a number.
   * @param n The value to translate to a number
   */
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

  selectColor(n: PixelValue, $event) {
    this.colorSelected.emit(n);

    for(const item of $event.path[1].children) {
      item.classList.remove('selected');
    }

    $event.target.classList.add('selected');
  }

}
