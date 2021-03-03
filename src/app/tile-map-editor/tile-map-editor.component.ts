import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Tile} from '../datamodels/tile.model';
import {PixelValue} from '../datamodels/pixel-value.model';
import {PixelColor} from '../datamodels/pixel-color.model';

@Component({
  selector: 'app-tile-map-editor',
  templateUrl: './tile-map-editor.component.html',
  styleUrls: ['./tile-map-editor.component.css']
})
export class TileMapEditorComponent implements OnInit, AfterViewInit {
  scale: number;
  rows: number;
  cols: number;
  showGridLines = true;

  selectedTile: Tile;
  selectedRow: number;
  selectedCol: number;

  canvasContext: CanvasRenderingContext2D;
  tileMap: Tile[];

  @ViewChild('tileMapCanvas') tileMapCanvas: ElementRef<HTMLCanvasElement>;

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
    this.canvasContext = this.tileMapCanvas.nativeElement.getContext('2d');
    this.drawTiles();
  }

  /**
   * Draw tiles to the canvas.
   */
  drawTiles() {
    this.tileMapCanvas.nativeElement.width = this.cols * 8 * this.scale + (this.showGridLines ? this.cols - 1 : 0);
    this.tileMapCanvas.nativeElement.height = this.rows * 8 * this.scale + (this.showGridLines ? this.rows - 1 : 0);
    this.canvasContext.clearRect(0, 0, this.tileMapCanvas.nativeElement.width, this.tileMapCanvas.nativeElement.height);
    this.canvasContext.fillStyle = '#00000033';
    this.canvasContext.fillRect(0, 0, this.tileMapCanvas.nativeElement.width, this.tileMapCanvas.nativeElement.height);

    const width = this.cols * 8;
    const height = this.rows * 8;

    for(let row = 0; row < height; row++) {
      for(let col = 0; col < width; col++) {
        const tileNum = (Math.floor(row / 8) * this.cols) + Math.floor(col / 8);
        const pixelRow = (Math.floor((col + (row * 128)) / 128)) % 8;
        const pixelIndex = (pixelRow * 8) + (Math.floor(col % 8));

        this.canvasContext.fillStyle = this.getColor(this.tileMap[tileNum].pixels[pixelIndex]);
        this.canvasContext.fillRect(
          8 * this.scale * Math.floor(col / 8) + ((col % 8) * this.scale) + Math.floor((this.showGridLines ? col : 0) / 8),
          8 * this.scale * Math.floor(row / 8) + ((row % 8) * this.scale) + Math.floor((this.showGridLines ? row : 0) / 8),
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
   * Finds which tile was clicked in the tile map and opens the tile in the tile editor.
   * @param $event The DOM event
   */
  canvasClicked($event) {
    const x = $event.offsetX;
    const y = $event.offsetY;
    const xOffset = Math.floor(x / (8 * this.scale));
    const yOffset = Math.floor(y / (8 * this.scale));
    this.selectedRow = Math.floor((y - yOffset) / 8 / this.scale);
    this.selectedCol = Math.floor((x - xOffset) / 8 / this.scale);
    this.selectedTile = this.tileMap[(this.selectedRow * this.cols) + this.selectedCol];
  }

  /**
   * Update tile data from the tile editor's change event.
   * @param tile The modified tile's data
   */
  updateTile(tile: Tile) {
    this.tileMap[(this.selectedRow * this.cols) + this.selectedCol] = tile;
    this.redraw();
  }

  /**
   * User changed the amount of rows to display.
   * @param $event The DOM event
   */
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

  /**
   * User changed the amount of columns to display.
   * @param $event The DOM event
   */
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

  /**
   * Add n number of rows. Rows will be added to the bottom of the tile map.
   * @param n Number of rows to add
   */
  addRows(n: number) {
    for(let i = 0; i < n; i++) {
      this.tileMap.push({
        pixels: Array(64).fill(0)
      });
    }
  }

  /**
   * Delete n number of rows. Rows will be deleted bottom-up.
   * @param n Number of rows to delete
   */
  deleteRows(n: number) {
    this.tileMap.splice(-n, n);
  }

  /**
   * Add n number of columns. Columns will be added to the right of the tile map.
   * @param n The amount of columns to add
   */
  addColumns(n: number) {
    const len = this.tileMap.length;

    for(let i = len; i > 0; i -= this.cols) {
      const tiles = [];

      for(let j = 0; j < n; j++) {
        tiles.push({ pixels: Array(64).fill(0) });
      }

      this.tileMap.splice(i, 0, ...tiles);
    }
  }

  /**
   * Delete n number of columns. Columns will be deleted right-to-left.
   * @param n The amount of columns to delete
   */
  deleteColumns(n: number) {
    for(let i = this.tileMap.length; i > 0; i--) {
      if(i % this.cols === 0) {
        this.tileMap.splice(i - n, n);
      }
    }
  }

  /**
   * Request animation frame from browser
   */
  redraw() {
    window.requestAnimationFrame(this.drawTiles.bind(this));
  }

}
