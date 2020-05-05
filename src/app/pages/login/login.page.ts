/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {ApiService} from '../../services/api.service';
import {AlertController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private api: ApiService, private alert: AlertController, private router: Router, private toast: ToastController) {
    }

    ngOnInit() {
    }

    login(event: any) {
        if (event instanceof User) {
            this.api.login(event.username, event.password).subscribe(() => {
                this.router.navigate(['home']);
                this.toast.create({
                    message: `Welcome back, ${event.username} !`,
                    duration: 5000
                }).then((toast) => {
                    toast.present();
                });
            }, (err) => {
                this.alert.create({
                    header: 'Login error',
                    message: `Unable to login, reason : ${err.error.error}`,
                    buttons: [
                        {
                            text: 'OK',
                            role: 'ok',
                        }
                    ]
                }).then((alert) => {
                    alert.present();
                });
            });
        }
    }
}
