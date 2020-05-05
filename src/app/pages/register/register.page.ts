/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {ApiService} from '../../services/api.service';
import {AlertController, ToastController} from '@ionic/angular';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    constructor(private api: ApiService, private alert: AlertController, private router: Router, private toast: ToastController) {
    }

    ngOnInit() {
    }

    register(event) {
        if (event instanceof User) {
            this.api.register(event.username, event.password).subscribe(() => {
                this.router.navigate(['home']);
                this.toast.create({
                    message: `Welcome ${event.username} !`,
                    duration: 5000
                }).then((toast) => {
                    toast.present();
                });
            }, (error: HttpErrorResponse) => {
                this.alert.create({
                    header: 'Register error',
                    message: `Unable to register, reason : ${error.error.error}`,
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
