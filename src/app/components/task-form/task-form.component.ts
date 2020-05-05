/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../models/task';
import {IonSelect} from '@ionic/angular';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
    @Input() task: Task = {
        title: '',
        description: '',
        users: [],
        delivery: new Date().toDateString(),
        priority: 1,
        inprogress: false
    };

    @Input() users: Array<string> = [];
    @Input() buttonText = 'Add';
    @Output() submit: EventEmitter<Task> = new EventEmitter<Task>();
    @ViewChild('select', {static: true}) select: IonSelect;

    formControl: FormGroup = this.formBuilder.group({
        title: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl('', [Validators.required, Validators.minLength(10)]),
        delivery: new FormControl('', [Validators.required]),
        priority: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
        users: new FormControl('', [Validators.required])
    });

    // tslint:disable-next-line:variable-name
    form_messages = {
        title: [
            {type: 'required', message: 'A title is required.'},
            {type: 'minlength', message: 'Title too small (min 3).'}
        ],
        description: [
            {type: 'required', message: 'A description is required.'},
            {type: 'minlength', message: 'Description too small (min 10).'}
        ],
        delivery: [
            {type: 'required', message: 'Delivery date required.'},
            {type: 'delivery', message: 'Invalid delivery date.'}
        ],
        priority: [
            {type: 'required', message: 'Priority required.'},
            {type: 'min', message: 'Priority too low.'},
            {type: 'max', message: 'Priority too high.'}
        ],
        users: [
            {type: 'required', message: 'User list is required.'},
        ]
    };

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.formControl.setValue({
            title: this.task.title,
            description: this.task.description,
            delivery: this.task.delivery,
            priority: this.task.priority,
            users: this.task.users
        });
    }

    getDate(event) {
        if (event.detail) {
            const date: string = event.detail.value;
            if (Date.now() >= Date.parse(date)) {
                this.formControl.get('delivery').setErrors({delivery: true});
            }
        }
    }

    onSubmit() {
        const task = this.formControl.value;
        task.users = this.select.value;
        task.inprogress = this.task.inprogress;
        this.submit.emit(new Task(task));
    }
}
