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
import {IMatchday, IPlayer} from '../scoretable/scoretable.component';


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
  playersCollection: AngularFirestoreCollection<IPlayer>;
  players: any;

  venue: string = '';
  date: Date;

  scoreCollection: AngularFirestoreCollection<IScore>;
  scores: any;


  selectedMatchday: AngularFirestoreDocument<IMatchday>;
  matchday: any;


  matchdayCollection: AngularFirestoreCollection<IMatchday>;
  matchdays: any;

  constructor(private firestore: AngularFirestore, public globalVars: GlobalVars, public dialog: MatDialog ) {}

  ngOnInit(): void {
    this.playersCollection = this.firestore.collection('players', ref => ref.orderBy('name', 'asc'));
    this.players = this.playersCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as IMatchday;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
    console.log(this.players );

      this.setMatchdays();
  }

  openScoreDialog() {
    this.dialog.open(ScoreDialogComponent, {
      panelClass: 'fnpc-dialog'
    });
  }

  openNewUserDialog() {
    this.dialog.open(UserToMatchdayDialogComponent, {
      panelClass: 'fnpc-dialog',
    });
  }

  openMatchdayDialog() {
    this.dialog.open(MatchdayDialogComponent, {
      panelClass: 'fnpc-dialog',
    });
  }

  getScore( playerid, scoreid ) {
    this.globalVars.selectedPlayer = playerid;
    this.globalVars.selectedScore = scoreid;
  }

  public setMatchdays()
  {
    this.matchdayCollection = this.firestore.collection('matchdays', ref => ref.orderBy('date', 'asc'));
    this.matchdays = this.matchdayCollection.snapshotChanges()
        .map(actions => {
          return actions.map( a => {
            const data = a.payload.doc.data() as IMatchday;
            const id = a.payload.doc.id;
            return {id, data};
          });
      });

    if (this.globalVars.matchdayId == '')
    {
      this.matchdays.subscribe(md => {
        this.matchdays = md;
        if (this.matchdays && this.matchdays.length > 0) {
          this.globalVars.matchdayId = this.matchdays[this.matchdays.length - 1].id;
          this.getScoreOfMatchday();
        }
      });
    }else{
      this.getScoreOfMatchday();
    }

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

    this.selectedMatchday = this.firestore.doc("matchdays/" + this.globalVars.matchdayId);
    this.matchday = this.selectedMatchday.snapshotChanges();
    this.matchday.subscribe(value => {

      this.venue = value.payload.data().venue;
      this.date = value.payload.data().date;
    });
  }

  getNextMatchday(){
    this.matchdays = this.getMatchdaySnapshotChanges();
    this.matchdays.subscribe(md => {
      this.matchdays = md;
      if (this.matchdays && this.matchdays.length > 0) {
        var index = 0;

        this.matchdays.forEach(matchday => {
          if (matchday.id == this.globalVars.matchdayId && index !== this.matchdays.length -1)
          {
            console.log('selected ID' + (index+1));
            this.globalVars.matchdayId = this.matchdays[index +1].id;
          } else{
            index ++;
          }
        });
      }
      this.getScoreOfMatchday();

    });

  }

  getPreviousMatchday(){
    this.matchdays = this.getMatchdaySnapshotChanges();
    this.matchdays.subscribe(md => {
      this.matchdays = md;
      if (this.matchdays && this.matchdays.length > 0) {
        var index = 0;

        this.matchdays.forEach(matchday => {
          if (matchday.id == this.globalVars.matchdayId && index !== 0)
          {
            console.log('selected ID' + (index -1));
            this.globalVars.matchdayId = this.matchdays[index -1].id;
          }
          index ++;
        });
      }
      this.getScoreOfMatchday();

    });
  }

  getMatchdaySnapshotChanges()
  {
    return this.matchdayCollection.snapshotChanges()
      .map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data() as IMatchday;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }


}
