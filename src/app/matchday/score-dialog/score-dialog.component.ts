import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-score-dialog',
  templateUrl: './score-dialog.component.html',
  styleUrls: ['./score-dialog.component.css']
})
export class ScoreDialogComponent implements OnInit {

  playerScore : number = 0;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit()
  {
  }

  insertScore() {
    this.firestore.collection("scores").add({
      value: this.playerScore
    });
  }
}
