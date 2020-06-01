import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {TileComponent} from '../tile/tile.component';
import {Tile} from '../datamodels/tile.model';
import {PixelValue} from '../datamodels/pixel-value.model';
import {PixelColor} from '../datamodels/pixel-color.model';

@Component({
  selector: 'app-tile-editor',
  templateUrl: './tile-editor.component.html',
  styleUrls: ['./tile-editor.component.css']
})
export class TileEditorComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() sourceTile: Tile;
  @Output() tileChanged = new EventEmitter<Tile>();

  @ViewChild(TileComponent) tileComponent: TileComponent;
  @ViewChild('tileCanvas') tileCanvas: ElementRef<HTMLCanvasElement>;

  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  pixels: PixelValue[];
  scale: number;

  constructor() {
    this.scale = 40;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.canvas = this.tileCanvas.nativeElement;
    this.canvasContext = this.canvas.getContext('2d');
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!this.sourceTile) {
      return;
    }

    this.pixels = this.sourceTile.pixels;
    this.drawPixels();
  }

  formatLabel(value: number) {
    return `${value}x`;
  }

  /**
   * Draw Pixels to the canvas
   */
  drawPixels() {
    this.canvas.width = 8 * this.scale + 7;
    this.canvas.height = 8 * this.scale + 7;
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.fillStyle = '#00000033';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for(let row = 0; row < 8; row++) {
      for(let col = 0; col < 8; col++) {
        const pixelIndex = row * 8 + col;
        this.canvasContext.fillStyle = this.getColor(this.pixels[pixelIndex]);
        this.canvasContext.fillRect(
          col * this.scale + col,
          row * this.scale + row,
          this.scale,
          this.scale
        );
      }
    }
  }

  /**
   * Gets color from a number.
   * @param n The value to translate to a number
   */
  getColor(n: number) {
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

  /**
   * Finds which tile was clicked in the tile map and opens the tile in the tile editor.
   * @param $event The DOM event
   */
  canvasClicked($event) {
    const x = $event.offsetX;
    const y = $event.offsetY;
    const xOffset = Math.floor(x / this.scale);
    const yOffset = Math.floor(y / this.scale);
    const row = Math.floor((y - yOffset) / this.scale);
    const col = Math.floor((x - xOffset) / this.scale);
    this.pixels[(row * 8) + col] = Math.floor(Math.random() * 4);
    this.changePixel();
    this.drawPixels();
  }

  /**
   * Pixel value was changed.
   */
  changePixel() {
    this.tileChanged.emit({ pixels: this.pixels });
  }

}
