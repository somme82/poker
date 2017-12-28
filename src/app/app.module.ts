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
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from 'angularfire2/firestore';
import { IMatchday } from './scoretable/scoretable.component';


import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { environment } from '../environments/environment';
import { GlobalVars } from '../globalVars';
import {MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatNativeDateModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import {UserToMatchdayDialogComponent} from './matchday/user-to-matchday-dialog/user-to-matchday-dialog.component';
import {MatchdayDialogComponent} from './matchday/matchday-dialog/matchday-dialog.component';
import {Observable} from 'rxjs/Observable';


@NgModule({
  declarations: [
    AppComponent,
    MatchdayComponent,
    ScoretableComponent,
    ArticlesComponent,
    HomeComponent,
    UserDialogComponent,
    ScoreDialogComponent,
    UserToMatchdayDialogComponent,
    MatchdayDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [GlobalVars],
  bootstrap: [AppComponent],
  entryComponents: [UserDialogComponent, ScoreDialogComponent, UserToMatchdayDialogComponent, MatchdayDialogComponent]
})
export class AppModule {

  matchdayCollection: AngularFirestoreCollection<IMatchday>;
  matchdays: any;

  constructor(private firestore: AngularFirestore) {
    console.log("constructor");
    this.matchdayCollection = this.firestore.collection('matchdays', ref => ref.orderBy('date', 'desc'));
    this.matchdays = this.matchdayCollection.snapshotChanges()
      .map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data() as IMatchday;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
    console.log(this.matchdays);
  }
}

