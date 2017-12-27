import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

export interface IPlayer {
  name: string;
}

@Component({
  selector: 'app-scoretable',
  templateUrl: './scoretable.component.html',
  styleUrls: ['./scoretable.component.css']
})
export class ScoretableComponent implements OnInit {

  playersCollection: AngularFirestoreCollection<IPlayer>;
  players: Observable<IPlayer[]>;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) {
  }


  openDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      panelClass: 'fnpc-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.playersCollection = this.firestore.collection('players');
    this.players = this.playersCollection.valueChanges();
  }
}
