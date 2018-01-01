import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {IPlayer} from '../scoretable.component';
import {Observable} from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  playerObs: any;
  player: IPlayer;

  constructor(private firestore: AngularFirestore) {
    this.player = <IPlayer>{};
    this.player.name = '';
    this.player.totalscore = 0;
    this.player.totalbuyin = 0;
    this.playerObs = Observable.of(this.player);
    this.playerObs.subscribe(value => {
      this.playerObs = value;
    });
  }

  ngOnInit() {
  }

  insertPlayer() {
    this.firestore.collection("players").add(this.player);
  }
}

