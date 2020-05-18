import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridComponent } from './reach/grid/grid.component';
import { OptionsBarComponent } from './reach/options-bar/options-bar.component';
import { ReachComponent } from './reach/reach.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    OptionsBarComponent,
    ReachComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
