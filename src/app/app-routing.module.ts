import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TileEditorComponent} from './tile-editor/tile-editor.component';

const routes: Routes = [
  { path: 'tile-editor', component: TileEditorComponent }
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
