/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import {TaskTableHeaderElement} from './task-table-header/TaskTableHeaderElement';
import {Task} from '../../models/task';

@Component({
    selector: 'app-task-table',
    templateUrl: './task-table.component.html',
    styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements OnInit {
    @ViewChild('table', {read: ElementRef, static: true}) table: ElementRef;

    @Input() header: Array<TaskTableHeaderElement> = [];
    @Input() tasks: Array<Task> = [];
    @Output() tasksChange: EventEmitter<Array<Task>> = new EventEmitter<Array<Task>>();

    @Input() width = '80%';
    @Input() maxWidth = '1000px';
    @Input() minWidth = '500px';

    @Input() height = '80%';
    @Input() maxHeight = '1000px';

    @Input() users: Array<string> = [];

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
        // Table With
        this.renderer.setStyle(this.table.nativeElement, 'max-width', this.maxWidth);
        this.renderer.setStyle(this.table.nativeElement, 'min-width', this.minWidth);
        this.renderer.setStyle(this.table.nativeElement, 'width', this.width);

        // Table height
        this.renderer.setStyle(this.table.nativeElement, 'max-height', this.maxHeight);
        this.renderer.setStyle(this.table.nativeElement, 'height', this.height);
    }

    removeTask(index: number) {
        this.tasks.splice(index, 1);
        this.tasksChange.emit(this.tasks);
    }

    taskChanged(event: Task, i: number) {
        this.tasksChange.emit(this.tasks);
    }
}
