import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  public progressPercent: number;
  public maxProgressPercent: number;

  constructor() { }

  ngOnInit() {
    this.progressPercent = 0;
    this.maxProgressPercent = 100;
  }

}
