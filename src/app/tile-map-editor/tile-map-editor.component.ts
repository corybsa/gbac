import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TileComponent} from '../tile/tile.component';

interface Tile {
  pixels: number[];
}

enum PixelValue {
  WHITE,
  LIGHT_GRAY,
  DARK_GRAY,
  BLACK
}

enum PixelColor {
  WHITE = '#FFFFFF',
  LIGHT_GRAY = '#AAAAAA',
  DARK_GRAY = '#555555',
  BLACK = '#000000'
}

@Component({
  selector: 'app-tile-map-editor',
  templateUrl: './tile-map-editor.component.html',
  styleUrls: ['./tile-map-editor.component.css']
})
export class TileMapEditorComponent implements OnInit, AfterViewInit {
  scale: number;
  rows: number;
  cols: number;
  selectedTile: TileComponent;

  canvasContext: CanvasRenderingContext2D;
  tileMap: Tile[];

  @ViewChild('canvasTest') canvas: ElementRef<HTMLCanvasElement>;

  constructor() {
    this.scale = 4;
    this.rows = 8;
    this.cols = 16;
    this.tileMap = [];

    this.addRows(this.rows * this.cols);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.canvasContext = this.canvas.nativeElement.getContext('2d');
    this.drawTiles();
  }

  drawTiles() {
    this.canvas.nativeElement.width = this.cols * 8 * this.scale + this.cols - 1;
    this.canvas.nativeElement.height = this.rows * 8 * this.scale + this.rows - 1;
    this.canvasContext.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.canvasContext.fillStyle = 'rgb(0, 0, 0)';

    const width = this.cols * 8;
    const height = this.rows * 8;

    for(let row = 0; row < height; row++) {
      for(let col = 0; col < width; col++) {
        const tileNum = (Math.floor(row / 8) * this.cols) + Math.floor(col / 8);
        const pixelRow = (Math.floor((col + (row * 128)) / 128)) % 8;
        const pixelIndex = (pixelRow * 8) + (Math.floor(col % 8));
        this.canvasContext.fillStyle = this.getColor(this.tileMap[tileNum].pixels[pixelIndex]);
        this.canvasContext.fillRect(
          8 * this.scale * Math.floor(col / 8) + ((col % 8) * this.scale) + Math.floor(col / 8),
          8 * this.scale * Math.floor(row / 8) + ((row % 8) * this.scale) + Math.floor(row / 8),
          this.scale,
          this.scale
        );
      }
    }
  }

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

  canvasClicked($event) {
    const x = $event.offsetX;
    const y = $event.offsetY;
    const xOffset = Math.floor(x / (8 * this.scale));
    const yOffset = Math.floor(y / (8 * this.scale));
    const row = Math.floor((y - yOffset) / 8 / this.scale);
    const col = Math.floor((x - xOffset) / 8 / this.scale);
    console.log($event, row, col);
    console.log(this.tileMap[row * col]);
  }

  changeRows($event) {
    let rows = +$event.target.value;

    if(rows < 0) {
      rows = 1;
    }

    if(rows > this.rows) {
      this.addRows((rows - this.rows) * this.cols);
    } else if(rows < this.rows) {
      this.deleteRows((this.rows - rows) * this.cols);
    }

    this.rows = rows;
    this.redraw();
  }

  changeCols($event) {
    let cols = +$event.target.value;

    if(cols < 0) {
      cols = 1;
    }

    if(cols > this.cols) {
      this.addColumns(cols - this.cols);
    } else if(cols < this.cols) {
      this.deleteColumns(this.cols - cols);
    }

    this.cols = cols;
    this.redraw();
  }

  addRows(n: number) {
    for(let i = 0; i < n; i++) {
      this.tileMap.push({
        pixels: Array(64).fill(Math.floor(Math.random() * 4))
      });
    }
  }

  deleteRows(n: number) {
    this.tileMap.splice(-n, n);
  }

  /**
   * Add number of specified columns
   * @param n The amount of columns to add
   */
  addColumns(n: number) {
    const len = this.tileMap.length;

    for(let i = len; i > 0; i -= this.cols) {
      const tiles = [];

      for(let j = 0; j < n; j++) {
        tiles.push({ pixels: Array(64).fill(3) });
      }

      this.tileMap.splice(i, 0, ...tiles);
    }
  }

  deleteColumns(n: number) {
    for(let i = this.tileMap.length; i > 0; i--) {
      if(i % this.cols === 0) {
        this.tileMap.splice(i - n, n);
      }
    }
  }

  redraw() {
    window.requestAnimationFrame(this.drawTiles.bind(this));
  }

}
