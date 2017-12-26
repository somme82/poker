import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {GlobalVars} from '../../globalVars';



interface Score {
  ID: string;
  Player_id: string;
  Value: string;
}


@Component({
  selector: 'app-matchday',
  templateUrl: './matchday.component.html',
  styleUrls: ['./matchday.component.css']
})


export class MatchdayComponent implements OnInit {
  scoreCollection: AngularFirestoreCollection<Score>;
  scores: Observable<Score[]>;

  constructor(private firestore: AngularFirestore, private globalVars: GlobalVars) {}


  ngOnInit(): void {

    this.globalVars.matchdayId = 3;

    this.scoreCollection = this.firestore.collection('Score');
    this.scores = this.scoreCollection.valueChanges();

  }

}
