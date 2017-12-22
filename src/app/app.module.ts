///<reference path="../../node_modules/@angular/material/toolbar/typings/toolbar.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatchdayComponent } from './matchday/matchday.component';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    MatchdayComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
