import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import {GlobalVars} from '../../globalVars';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatepickerInputEvent} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import {MatDatepicker} from '@angular/material';
import {FormControl} from '@angular/forms';
import {IScore} from '../matchday/matchday.component';

export interface IPlayer {
  name: string;
}

export interface IMatchday{
  date: Date;
  venue: string;
}

interface IMatchday_meta extends IMatchday{
  id: string;
}

@Component({
  selector: 'app-scoretable',
  templateUrl: './scoretable.component.html',
  styleUrls: ['./scoretable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoretableComponent implements OnInit {

  playersCollection: AngularFirestoreCollection<IPlayer>;
  players: Observable<IPlayer[]>;
  matchdayDate: Date;
  newMatchdayDoc: AngularFirestoreDocument<IScore>;
  newMatchday: any;

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog, private globalVars: GlobalVars) {
  }

  onDateChange = (e: MatDatepickerInputEvent<Date>) => {
    this.matchdayDate = e.value;
    const pushkey = this.firestore.createId();
    this.firestore.collection("matchdays").doc(pushkey).set({
      date: this.matchdayDate,
      venue: this.globalVars.selectedPlayer
    });
    this.newMatchdayDoc = this.firestore.doc('matchdays/' + pushkey);
    this.newMatchday = this.newMatchdayDoc.snapshotChanges();
    this.globalVars.matchdayId = pushkey;
  }

  dateCtrl = new FormControl();

  openDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      panelClass: 'fnpc-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDatepicker()
  {
    this.datepicker.open();
  }

  setPlayer(name){
    this.globalVars.selectedPlayer = name;
  }

  ngOnInit() {
    this.playersCollection = this.firestore.collection('players', ref => ref.orderBy('totalscore', 'desc'));
    this.players = this.playersCollection.valueChanges();
  }
}
