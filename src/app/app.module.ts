///<reference path="../../node_modules/@angular/material/toolbar/typings/toolbar.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatchdayComponent } from './matchday/matchday.component';
import { ScoretableComponent } from './scoretable/scoretable.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomeComponent } from './home/home.component';


import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    MatchdayComponent,
    ScoretableComponent,
    ArticlesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
