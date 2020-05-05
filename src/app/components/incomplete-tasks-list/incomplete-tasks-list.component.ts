/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Component, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {NavParams} from '@ionic/angular';

@Component({
    selector: 'app-incomplete-tasks-list',
    templateUrl: './incomplete-tasks-list.component.html',
    styleUrls: ['./incomplete-tasks-list.component.scss'],
})
export class IncompleteTasksListComponent implements OnInit {
    tasks: Array<Task> = [];

    constructor(private navParams: NavParams) {
    }

    async ngOnInit() {
        this.tasks = this.navParams.get('tasks');
    }

}
