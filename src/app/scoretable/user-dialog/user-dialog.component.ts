import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  userName: string = '';

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  insertPlayer() {
    this.firestore.collection("players").add({
      name: this.userName,
      totalscore: 0,
      totalbuyin: 0
    });
  }
}

