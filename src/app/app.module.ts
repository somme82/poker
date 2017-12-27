///<reference path="../../node_modules/@angular/material/toolbar/typings/toolbar.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatchdayComponent } from './matchday/matchday.component';
import { ScoretableComponent } from './scoretable/scoretable.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomeComponent } from './home/home.component';
import { UserDialogComponent } from './scoretable/user-dialog/user-dialog.component';
import { ScoreDialogComponent } from './matchday/score-dialog/score-dialog.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';


import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { environment } from '../environments/environment';
import { GlobalVars } from '../globalVars';
import { MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    MatchdayComponent,
    ScoretableComponent,
    ArticlesComponent,
    HomeComponent,
    UserDialogComponent,
    ScoreDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [GlobalVars],
  bootstrap: [AppComponent],
  entryComponents: [UserDialogComponent, ScoreDialogComponent]
})
export class AppModule {

  constructor() {
    console.log('calling constructor');
  }
}
