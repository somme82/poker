import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/map';

import {GlobalVars} from '../../globalVars';
import {ScoreDialogComponent} from './score-dialog/score-dialog.component';



interface scores {
  player: string;
  value: string;
}

@Component({
  selector: 'app-matchday',
  templateUrl: './matchday.component.html',
  styleUrls: ['./matchday.component.css']
})


export class MatchdayComponent implements OnInit {
  scoreCollection: AngularFirestoreCollection<scores>;
  scores: Observable<scores[]>;

  constructor(private firestore: AngularFirestore, public globalVars: GlobalVars, public dialog: MatDialog) {}


  ngOnInit(): void {

    this.globalVars.matchdayId = 3;

    this.scoreCollection = this.firestore.collection('scores', ref => ref.where('matchday', '==', 'qyyaOd3yfKJPbCkWHHBs'));
    this.scores = this.scoreCollection.valueChanges();
  }

  openScoreDialog() {
    const dialogRef = this.dialog.open(ScoreDialogComponent, {
      panelClass: 'fnpc-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
