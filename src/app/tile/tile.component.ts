import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() scale: number;

  pixels = [];

  constructor() {
  }

  ngOnInit(): void {
    for(let i = 0; i < 64; i++) {
      // this.pixels.push({ color: Math.floor(Math.random() * 4) });
      this.pixels.push({ color: 3 });
    }
  }
}
