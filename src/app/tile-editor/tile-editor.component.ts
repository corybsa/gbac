import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile-editor',
  templateUrl: './tile-editor.component.html',
  styleUrls: ['./tile-editor.component.css']
})
export class TileEditorComponent implements OnInit {
  scale: number;
  rows: number;
  cols: number;

  constructor() {
    this.scale = 8;
    this.rows = 8;
    this.cols = 16;
  }

  ngOnInit(): void {
  }

  changeRows($event) {
    this.rows = +$event.target.value;
  }

  changeCols($event) {
    this.cols = +$event.target.value;
  }

}
