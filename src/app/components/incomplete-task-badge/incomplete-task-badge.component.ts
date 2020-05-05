/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {PopoverController} from '@ionic/angular';
import {IncompleteTasksListComponent} from '../incomplete-tasks-list/incomplete-tasks-list.component';

@Component({
    selector: 'app-incomplete-task-badge',
    templateUrl: './incomplete-task-badge.component.html',
    styleUrls: ['./incomplete-task-badge.component.scss'],
})
export class IncompleteTaskBadgeComponent implements OnInit, AfterViewInit {
    // tslint:disable-next-line:variable-name
    _tasks;
    uncompletedTasks: Array<Task> = [];

    @Input() set tasks(val: Array<Task>) {
        this._tasks = val;
        this.uncompletedTasks = this._tasks.filter((task: Task) => task.inprogress);
    }
    constructor(private popOverCtrl: PopoverController) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    showUncompletedTasks(event) {
        this.popOverCtrl.create({
            component: IncompleteTasksListComponent,
            componentProps: {
                tasks: this.uncompletedTasks
            },
            event
        }).then((popover) => {
            popover.present();
        });
    }
}
