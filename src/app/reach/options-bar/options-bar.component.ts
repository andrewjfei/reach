import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.css']
})
export class OptionsBarComponent implements OnInit {
  @Output() handleNodeChange: EventEmitter<String> = new EventEmitter();

  options: object = [
    {
      'name': 'Start Node',
      'description': 'Initial Node',
      'code': 'start'
    },
    {
      'name': 'Target Node',
      'description': 'End Node',
      'code': 'target'
    },
    {
      'name': 'Wall',
      'description': 'Barriers',
      'code': 'wall'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

  handleOptionChange(value: String) {
    this.handleNodeChange.emit(value);
  }

  handleStartButton() {
    
  }

}
