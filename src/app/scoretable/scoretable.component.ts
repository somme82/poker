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
import {forEach} from '@angular/router/src/utils/collection';
import 'rxjs/add/observable/of';

export interface IPlayer {
  name: string;
  totalscore: number;
  totalbuyin: number;
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
  players: any

  scoreCollection: AngularFirestoreCollection<IScore>;
  scores: any;

  matchdayDate: Date;
  newMatchdayDoc: AngularFirestoreDocument<IScore>;
  newMatchday: any;


  playerResults: IPlayer[] = new Array<IPlayer>();

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

  openDialog() {
    this.dialog.open(UserDialogComponent, {
      panelClass: 'fnpc-dialog'
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
    this.playersCollection = this.firestore.collection('players');
    this.players = this.playersCollection.snapshotChanges()
      .map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data() as IPlayer;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }

  getPlayerResults(){
      this.playerResults = new Array<IPlayer>()
      console.log('begin getPlayerResults');
      this.scoreCollection = this.firestore.collection('scores');
      this.scores = this.scoreCollection.snapshotChanges()
        .map(actions => {
          return actions.map( a => {
            const data = a.payload.doc.data() as IScore;
            const id = a.payload.doc.id;
            return {id, data};
          });
        });

      this.scores.subscribe( s => {
        this.scores = s;
        if (this.scores && this.scores.length > 0) {
          this.scores.forEach(s => {
            if (this.playerResults.some(p => p.name === s.data.player))
            {
              this.playerResults.find(p => p.name === s.data.player).totalscore += s.data.totalscore;
              this.playerResults.find(p => p.name === s.data.player).totalbuyin += s.data.buyin;
            } else {
              var player = <IPlayer>{};
              player.name = s.data.player;
              player.totalscore = s.data.totalscore;
              player.totalbuyin = s.data.buyin;
              this.playerResults.push(player);
            }
          })
        }

        this.playerResults = this.playerResults.sort(function(a, b){
          return b.totalscore-a.totalscore;
        });
        console.log(this.playerResults);
      });
  }

  getNextYear()
  {
  }
}
