import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TileEditorComponent } from './tile-editor/tile-editor.component';
import { AppRoutingModule } from './app-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import { TileComponent } from './tile/tile.component';
import { TileMapComponent } from './tile-map/tile-map.component';
import { TimesPipe } from './pipes/times.pipe';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    TileEditorComponent,
    TileComponent,
    TileMapComponent,
    TimesPipe
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    AppRoutingModule,
    MatGridListModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
