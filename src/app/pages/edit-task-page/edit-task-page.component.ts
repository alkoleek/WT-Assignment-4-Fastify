/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {Task} from '../../models/task';
import {ApiService} from '../../services/api.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-edit-task-page',
    templateUrl: './edit-task-page.component.html',
    styleUrls: ['./edit-task-page.component.scss'],
})
export class EditTaskPageComponent implements OnInit {
    thisModal;
    users: Array<string> = [];
    task: Task;

    constructor(private modalCtrl: ModalController,
                private navParams: NavParams,
                private api: ApiService,
                private alert: AlertController) {
    }

    close() {
        this.thisModal.dismiss();
    }

    async ngOnInit() {
        this.thisModal = await this.modalCtrl.getTop();
        this.users = this.navParams.get('users');
        this.task = this.navParams.get('task');
    }

    onSubmit(event: Task) {
        if (event instanceof Task) {
            this.api.editTask(event).subscribe((task) => {
                this.thisModal.dismiss({
                    task
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
    }
}
