/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {ApiService} from '../../services/api.service';
import {Task} from '../../models/task';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-add-task-page',
    templateUrl: './add-task-page.component.html',
    styleUrls: ['./add-task-page.component.scss'],
})
export class AddTaskPageComponent implements OnInit {
    thisModal;
    users: Array<string> = [];

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
    }

    addTask(event: Task) {
        if (event instanceof Task) {
            this.api.addTask(event).subscribe((task) => {
                this.thisModal.dismiss({
                    task
                });
            }, (err: HttpErrorResponse) => {
                this.alert.create({
                    header: 'Add task error',
                    message: `Unable to create task, reason : ${err.error.error}`,
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
