import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { GlobalVars } from '../../globalVars';
import 'rxjs/add/operator/map';
import { ScoreDialogComponent } from './score-dialog/score-dialog.component';
import { UserToMatchdayDialogComponent } from './user-to-matchday-dialog/user-to-matchday-dialog.component';
import {MatchdayDialogComponent} from './matchday-dialog/matchday-dialog.component';


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

  constructor(private firestore: AngularFirestore, public globalVars: GlobalVars, public dialog: MatDialog ) {}

  ngOnInit(): void {
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
}
