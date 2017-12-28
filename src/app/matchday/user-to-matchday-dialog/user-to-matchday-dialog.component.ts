import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {IPlayer} from '../../scoretable/scoretable.component';
import {GlobalVars} from '../../../globalVars';

@Component({
  selector: 'app-user-to-matchday-dialog',
  templateUrl: './user-to-matchday-dialog.component.html',
  styleUrls: ['./user-to-matchday-dialog.component.css']
})
export class UserToMatchdayDialogComponent implements OnInit {

  playersCollection: AngularFirestoreCollection<IPlayer>;
  players: Observable<IPlayer[]>;

  constructor(private firestore: AngularFirestore, private globalVars: GlobalVars) { }

  ngOnInit() {
    this.playersCollection = this.firestore.collection('players', ref => ref.orderBy('name', 'asc'));
    this.players = this.playersCollection.valueChanges();
  }

  insertPlayer(name){
    this.firestore.collection("scores").add({
      chips: 0,
      totalscore: 0,
      buyin: 10,
      player: name,
      matchday: this.globalVars.matchdayId
    });
  }

}
