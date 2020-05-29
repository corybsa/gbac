import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TileMapEditorComponent} from './tile-map-editor/tile-map-editor.component';

const routes: Routes = [
  { path: 'tile-map-editor', component: TileMapEditorComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
