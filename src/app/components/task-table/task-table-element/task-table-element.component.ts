/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../models/task';
import {ApiService} from '../../../services/api.service';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {EditTaskPageComponent} from '../../../pages/edit-task-page/edit-task-page.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-task-table-element',
    templateUrl: './task-table-element.component.html',
    styleUrls: ['./task-table-element.component.scss'],
})
export class TaskTableElementComponent implements OnInit {
    @Input() task: Task = {
        title: 'My task',
        description: 'My task one',
        users: ['me'],
        priority: 1,
        inprogress: false,
        delivery: new Date().toDateString()
    };
    @Output() taskChange: EventEmitter<Task> = new EventEmitter<Task>();
    @Output() remove: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() users: Array<string> = [];

    constructor(private api: ApiService,
                private ref: ElementRef,
                private modalCtrl: ModalController,
                private toast: ToastController, private alert: AlertController) {
    }

    ngOnInit() {
    }

    updateProgress(event, task: Task) {
        this.taskChange.emit(this.task);
        this.api.editTask(task).subscribe(() => {
            this.toast.create({
                message: 'Task successfully edited',
                duration: 5000,
            }).then((toast) => {
                toast.present();
            });

        }, (err: HttpErrorResponse) => {
            this.alert.create({
                header: 'Edit task error',
                message: `Unable to edit task, reason : ${err.error.error}`,
                buttons: [
                    {
                        role: 'ok',
                        text: 'Ok'
                    }
                ]
            }).then((alert) => {
                alert.present();
            });
        });
    }

    editTask(task: Task) {
        this.modalCtrl.create({
            componentProps: {task, users: this.users},
            component: EditTaskPageComponent
        }).then((modal) => {
            modal.onDidDismiss().then((data) => {
                if (data && data.hasOwnProperty('data') && data.data && data.data.hasOwnProperty('task')) {
                    this.task = data.data.task;
                    this.taskChange.emit(this.task);
                    this.toast.create({
                        message: 'Task successfully edited',
                        duration: 5000,
                    }).then((toast) => {
                        toast.present();
                    });
                }
            });
            modal.present();
        });
    }

    deleteTask(task: Task) {
        this.api.rmTask(task).subscribe(() => {
            this.remove.emit(true);
            this.ref.nativeElement.remove();
            this.toast.create({
                message: 'Task successfully removed',
                duration: 5000,
            }).then((toast) => {
                toast.present();
            });
        }, (err) => {
            console.error(err);
        });
    }
}
