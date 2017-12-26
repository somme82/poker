import { Component, OnInit } from '@angular/core';
import {GlobalVars} from '../../globalVars';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private globalVars: GlobalVars) {}

  ngOnInit() {
  }

}
