import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reach',
  templateUrl: './reach.component.html',
  styleUrls: ['./reach.component.css']
})
export class ReachComponent implements OnInit {

  selectedNode: String = 'wall';

  constructor() { }

  ngOnInit() {
  }

  handleNodeChange(code: String) {
    this.selectedNode = code;
    console.log(this.selectedNode);
  }

}
