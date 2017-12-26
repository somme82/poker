import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

interface Players {
  ID: string;
  Name: string;
  Value: string;
}

@Component({
  selector: 'app-scoretable',
  templateUrl: './scoretable.component.html',
  styleUrls: ['./scoretable.component.css']
})
export class ScoretableComponent implements OnInit {

  playersDocument: AngularFirestoreDocument<Players>;
  players: Observable<Players>;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.playersDocument = this.firestore.doc('Players');
  }

  newUser() {
    console.log("inserting new user...");
    // Add a new document in collection "cities"
    this.firestore.collection("Players").doc("test").set({
      name: "Test User",
      ID: "2"
    })
  }

}
