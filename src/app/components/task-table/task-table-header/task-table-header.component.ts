/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Component, Input, OnInit} from '@angular/core';
import {TaskTableHeaderElement} from './TaskTableHeaderElement';

@Component({
  selector: 'app-task-table-header',
  templateUrl: './task-table-header.component.html',
  styleUrls: ['./task-table-header.component.scss'],
})
export class TaskTableHeaderComponent implements OnInit {
  @Input() header: Array<TaskTableHeaderElement> = [];

  constructor() { }

  ngOnInit() {}

}
