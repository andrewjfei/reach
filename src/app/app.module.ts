import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridComponent } from './reach/grid/grid.component';
import { OptionsBarComponent } from './reach/options-bar/options-bar.component';
import { ReachComponent } from './reach/reach.component';
import { HeaderComponent } from './reach/header/header.component';
import { TitleComponent } from './reach/title/title.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    OptionsBarComponent,
    ReachComponent,
    HeaderComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
