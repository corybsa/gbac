import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tile-map',
  templateUrl: './tile-map.component.html',
  styleUrls: ['./tile-map.component.css']
})
export class TileMapComponent implements OnInit {
  @Input() scale: number;
  @Input() rows: number;
  @Input() cols: number;

  constructor() { }

  ngOnInit(): void {
  }

}
