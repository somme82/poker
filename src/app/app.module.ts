///<reference path="../../node_modules/@angular/material/toolbar/typings/toolbar.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatchdayComponent } from './matchday/matchday.component';
import { ScoretableComponent } from './scoretable/scoretable.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomeComponent } from './home/home.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';


import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import {environment} from '../environments/environment';
import {GlobalVars} from '../globalVars';


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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [GlobalVars],
  bootstrap: [AppComponent]
})
export class AppModule { }
