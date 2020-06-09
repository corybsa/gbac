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

  @ViewChild('tileCanvas') tileCanvas: ElementRef<HTMLCanvasElement>;

  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  pixels: PixelValue[];
  scale: number;

  selectedColor: PixelValue;
  isMouseDown = false;

  mouseCoords: { row: number, col: number } = {
    row: 0,
    col: 0
  };

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

  /**
   * Finds which pixel was clicked and changes the color of that pixel.
   * @param $event The DOM event
   */
  canvasClicked($event) {
    this.mouseCoords = this.getMousePixel($event);
    this.pixels[(this.mouseCoords.row * 8) + this.mouseCoords.col] = this.selectedColor;
    this.changePixel();
    this.drawPixels();
  }

  /**
   * Pixel value was changed.
   */
  changePixel() {
    this.tileChanged.emit({ pixels: this.pixels });
  }

  /**
   * Changes the color of pixel that will be drawn.
   * @param $event The {@link PixelValue} to change to.
   */
  changeColor($event: PixelValue) {
    this.selectedColor = $event;
  }

  getMousePixel($event): { row: number, col: number } {
    const x = $event.offsetX;
    const y = $event.offsetY;
    const xOffset = Math.floor(x / this.scale);
    const yOffset = Math.floor(y / this.scale);
    const row = Math.floor((y - yOffset) / this.scale);
    const col = Math.floor((x - xOffset) / this.scale);
    return { row, col };
  }

  mouseDown() {
    this.isMouseDown = true;
  }

  mouseUp() {
    this.isMouseDown = false;
  }

  mouseMove($event) {
    const coords = this.getMousePixel($event);

    // only update the pixel if the mouse button is being pressed and the mouse has moved to a different pixel
    if(this.isMouseDown && (coords.row !== this.mouseCoords.row || coords.col !== this.mouseCoords.col)) {
      this.canvasClicked($event);
      console.log('mousemove', $event);
    }
  }

}
