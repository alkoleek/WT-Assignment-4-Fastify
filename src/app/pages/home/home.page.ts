/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {TaskTableHeaderElement} from '../../components/task-table/task-table-header/TaskTableHeaderElement';
import {Task} from '../../models/task';
import {ApiService} from '../../services/api.service';
import {AddTaskPageComponent} from '../add-task-page/add-task-page.component';
import {ModalController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    header: Array<TaskTableHeaderElement> = [
        {
            name: 'Task',
            size: 2
        },
        {
            name: 'Description',
            size: 3
        },
        {
            name: 'Users',
            size: 2
        },
        {
            name: 'Date',
            size: 2
        },
        {
            name: 'Rank',
            size: 1
        },
        {
            name: 'Active',
            size: 1
        },
        {
            name: 'Tools',
            size: 1
        }
    ];

    tasks: Array<Task> = [
        {
            title: 'My task',
            description: 'My task one',
            users: ['me'],
            priority: 1,
            inprogress: false,
            delivery: new Date().toDateString()
        },
        {
            title: 'My task',
            description: 'My task one',
            users: ['me'],
            priority: 1,
            inprogress: false,
            delivery: new Date().toDateString()
        },
        {
            title: 'My task',
            description: 'My task one',
            users: ['me'],
            priority: 1,
            inprogress: false,
            delivery: new Date().toDateString()
        },
        {
            title: 'My task',
            description: 'My task one',
            users: ['me'],
            priority: 1,
            inprogress: false,
            delivery: new Date().toDateString()
        }
    ];

    users: Array<string> = [
        'Michel'
    ];

    ionViewWillEnter() {
        this.api.getUsers().subscribe((users) => {
            this.users = users;
        });

        this.api.getTasks().subscribe((tasks) => {
            this.tasks = tasks;
        });
    }

    constructor(private auth: AuthService,
                private router: Router,
                private api: ApiService,
                private modalCtrl: ModalController,
                private toast: ToastController) {
    }

    ngOnInit() {
        this.api.getUsers().subscribe((users) => {
            this.users = users;
        });

        this.api.getTasks().subscribe((tasks) => {
            this.tasks = tasks;
        });
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['login']);
    }

    tasksChanged(event: Array<Task>) {
        // Used to trigger change detection
        this.tasks = [...event];
    }

    async addTask() {
        const modal = await this.modalCtrl.create({
            component: AddTaskPageComponent,
            cssClass: 'task-popover',
            componentProps: {
                users: this.users
            }
        });

        modal.onDidDismiss()
            .then(async (data: any) => {
                if (data && data.hasOwnProperty('data') && data.data && data.data.hasOwnProperty('task')) {
                    this.tasks = [...this.tasks, data.data.task];
                    this.toast.create({
                        message: 'Task successfully created',
                        duration: 5000
                    }).then((toast) => {
                        toast.present();
                    });
                }
            });

        return modal.present();
    }
}
