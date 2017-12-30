import { Component, OnInit } from '@angular/core';
import {GlobalVars} from '../../globalVars';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {IMatchday, IPlayer} from '../scoretable/scoretable.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  playersCollection: AngularFirestoreCollection<IPlayer>;
  players: any;

  constructor(private globalVars: GlobalVars, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.playersCollection = this.firestore.collection('players', ref => ref.orderBy('name', 'asc'));
    this.players = this.playersCollection.snapshotChanges()
      .map(value => {
        var id=10;
        value.forEach(item => {
          const data = item.payload.doc.data() as IPlayer;
          data.totalbuyin = id + 10;
        });
        var ordered = value.sort(function(a, b){
          return b.payload.doc.data().totalscore-a.payload.doc.data().totalscore;
        });
      });


    var scoreMap: Map<string, number> = new Map<string, number>();
    scoreMap.set('Micha', 23);
    scoreMap.set('Chris', 90);
    scoreMap.set('Steff', 67);

    this.players = this.playersCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as IPlayer;
          data.totalscore = scoreMap.get(data.name);
          const id = a.payload.doc.id;
          return {id, data};
        }).sort(function(a, b){
          return b.data.totalscore-a.data.totalscore;
        });
      });

    this.players.forEach(p => {

    })

  }

}
