import { Component, OnInit } from '@angular/core';
import {MatFormField} from '@angular/material';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {IScore} from '../matchday.component';
import {GlobalVars} from '../../../globalVars';
import {IMatchday} from '../../scoretable/scoretable.component';

@Component({
  selector: 'app-matchday-dialog',
  templateUrl: './matchday-dialog.component.html',
  styleUrls: ['./matchday-dialog.component.css']
})
export class MatchdayDialogComponent implements OnInit {
  scoreCollection: AngularFirestoreCollection<IScore>;
  score: any
  constructor(private firestore: AngularFirestore, private globalVars: GlobalVars) { }

  ngOnInit() {
  }

  deleteMatchday(){
    this.scoreCollection = this.firestore.collection('scores', ref => ref.where('matchday', '==', this.globalVars.matchdayId));
    this.score = this.scoreCollection.snapshotChanges()
      .map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data() as IScore;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
    console.log(this.score);

    this.score.subscribe(sc => {
      this.score = sc;
      if (this.score && this.score.length > 0) {
        this.score.forEach(s =>{
            this.firestore.doc('scores/' + s.id).delete();
          }
        );
      }

    });
    this.firestore.doc('matchdays/' + this.globalVars.matchdayId).delete();
    

  }

}
