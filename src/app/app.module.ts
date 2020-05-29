import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TileMapEditorComponent } from './tile-map-editor/tile-map-editor.component';
import { AppRoutingModule } from './app-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import { TileComponent } from './tile/tile.component';
import { TileMapComponent } from './tile-map/tile-map.component';
import { TimesPipe } from './pipes/times.pipe';
import {MatInputModule} from '@angular/material/input';
import { TileEditorComponent } from './tile-editor/tile-editor.component';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TileMapEditorComponent,
    TileComponent,
    TileMapComponent,
    TimesPipe,
    TileEditorComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    AppRoutingModule,
    MatGridListModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
