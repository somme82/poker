import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { GlobalVars } from '../../globalVars';
import 'rxjs/add/operator/map';
import { ScoreDialogComponent } from './score-dialog/score-dialog.component';
import { UserToMatchdayDialogComponent } from './user-to-matchday-dialog/user-to-matchday-dialog.component';
import {MatchdayDialogComponent} from './matchday-dialog/matchday-dialog.component';
import {AppModule} from '../app.module';
import {IMatchday} from '../scoretable/scoretable.component';


export interface IScore {
  player: string;
  chips: number;
  matchday: string;
  buyin: number;
  totalscore: number;
}

interface IScore_id extends IScore{
  id: string;
}

@Component({
  selector: 'app-matchday',
  templateUrl: './matchday.component.html',
  styleUrls: ['./matchday.component.css']
})


export class MatchdayComponent implements OnInit {
  scoreCollection: AngularFirestoreCollection<IScore>;
  scores: any;


  scoreDoc: AngularFirestoreDocument<IScore>;
  score: Observable<IScore>;

  matchdayCollection: AngularFirestoreCollection<IMatchday>;
  matchdays: any;

  constructor(private firestore: AngularFirestore, public globalVars: GlobalVars, public dialog: MatDialog ) {}

  ngOnInit(): void {
    console.log(this.globalVars.matchdayId);

    if (this.globalVars.matchdayId == '')
    {
      console.log("matchdayid empty!");
      this.setMatchdays();
    } else{
      console.log("matchdayid set!");
      this.getScoreOfMatchday();
    }
    console.log(this.globalVars.matchdayId);
  }

  openScoreDialog() {
    const dialogRef = this.dialog.open(ScoreDialogComponent, {
      panelClass: 'fnpc-dialog'
    });
  }

  openNewUserDialog() {
    const dialogRef = this.dialog.open(UserToMatchdayDialogComponent, {
      panelClass: 'fnpc-dialog',
    });
  }

  openMatchdayDialog() {
    const dialogRef = this.dialog.open(MatchdayDialogComponent, {
      panelClass: 'fnpc-dialog',
    });
  }

  getScore( playerid, scoreid ) {
    this.globalVars.selectedPlayer = playerid;
    this.globalVars.selectedScore = scoreid;
  }

  public setMatchdays()
  {
    this.matchdayCollection = this.firestore.collection('matchdays', ref => ref.orderBy('date', 'desc'));
    this.matchdays = this.matchdayCollection.snapshotChanges()
      .map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data() as IMatchday;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });

    this.matchdays.subscribe(md => {
      this.matchdays = md;
      console.log(this.matchdays);
      if (this.matchdays && this.matchdays.length > 0) {
        this.globalVars.matchdayId = this.matchdays[this.matchdays.length - 1].id;
      }
      this.getScoreOfMatchday();

    });

  }

  getScoreOfMatchday()
  {
    console.log('receiving score from of matchday: ' + this.globalVars.matchdayId);
    this.scoreCollection = this.firestore.collection('scores', ref => ref.where('matchday', '==', this.globalVars.matchdayId).orderBy('totalscore', 'desc'));
    this.scores = this.scoreCollection.snapshotChanges()
      .map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data() as IScore;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }

  getNextMatchday(){
    console.log("getPreviousMatchday");
    this.matchdays = this.matchdayCollection.snapshotChanges()
      .map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data() as IMatchday;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });

    this.matchdays.subscribe(md => {
      this.matchdays = md;
      console.log(this.matchdays);
      if (this.matchdays && this.matchdays.length > 0) {
        this.matchdays.forEach(matchday => {
          console.log(matchday.data.venue);
        });

        this.globalVars.matchdayId = this.matchdays[this.matchdays.length - 1].id;
      }
      this.getScoreOfMatchday();

    });

  }

  getPreviousMatchday(){
    console.log("getNextMatchday");
  }

}
