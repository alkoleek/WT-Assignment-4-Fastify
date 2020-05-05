/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    @Output() submit: EventEmitter<User> = new EventEmitter<User>();
    @Input() buttonText = 'Log in';
    formControl: FormGroup = this.formBuilder.group({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });

    // tslint:disable-next-line:variable-name
    form_messages = {
        username: [
            {type: 'required', message: 'Username is required.'},
            {type: 'minlength', message: 'Username too short.'}
        ],
        password: [
            {type: 'required', message: 'Password required.'},
            {type: 'minlength', message: 'Password too short.'}
        ]
    };

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.submit.emit(new User(this.formControl.value));
    }
}
