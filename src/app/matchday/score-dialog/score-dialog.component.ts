import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { GlobalVars } from '../../../globalVars';
import { IScore } from '../../matchday/matchday.component';

@Component({
  selector: 'app-score-dialog',
  templateUrl: './score-dialog.component.html',
  styleUrls: ['./score-dialog.component.css']
})

export class ScoreDialogComponent implements OnInit {

  selectedScore: AngularFirestoreDocument<IScore>;
  score: any;

  playerScore: number;
  playerBuyIn: number;

  constructor(private firestore: AngularFirestore, private globalVars: GlobalVars) { }

  ngOnInit()
  {
    this.selectedScore = this.firestore.doc("scores/" + this.globalVars.selectedScore);
    this.score = this.selectedScore.snapshotChanges();
    this.score.subscribe(value => {
      const player = value.payload.data().player;

      this.playerScore = value.payload.data().value;
      this.playerBuyIn = value.payload.data().buyin;
    });

  }

  insertScore() {
    this.firestore.doc("scores/" + this.globalVars.selectedScore).update({
      value: this.playerScore,
      buyin: this.playerBuyIn
    });
  }
}
