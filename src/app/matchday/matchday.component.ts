import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { GlobalVars } from '../../globalVars';
import 'rxjs/add/operator/map';
import {ScoreDialogComponent} from './score-dialog/score-dialog.component';



export interface IScore {
  player: string;
  value: string;
  matchday: string;
  buyin: number;
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
    this.scoreCollection = this.firestore.collection('scores', ref => ref.where('matchday', '==', this.globalVars.matchdayId).orderBy('value', 'asc'));
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

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getScore( playerid, scoreid ) {
    this.globalVars.selectedPlayer = playerid;
    this.globalVars.selectedScore = scoreid;
  }

  /*this.scoreDoc = this.firestore.doc('scores/' + playerId);
  this.score = this.scoreDoc.valueChanges();
  console.log(this.scoreDoc.ref.path);*/
}
