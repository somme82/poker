import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


interface Player {
  id: string;
  name: string;
}


@Component({
  selector: 'app-matchday',
  templateUrl: './matchday.component.html',
  styleUrls: ['./matchday.component.css']
})


export class MatchdayComponent implements OnInit {
  playersCollection: AngularFirestoreCollection<Player>;
  players: Observable<Player[]>;

  constructor(private firestore: AngularFirestore) {}


  ngOnInit(): void {
    this.playersCollection = this.firestore.collection('Players');

    this.players = this.playersCollection.valueChanges();

  }

}
