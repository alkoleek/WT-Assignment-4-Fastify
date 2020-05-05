/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserFormComponent} from '../components/user-form/user-form.component';
import {SiteHeaderComponent} from '../components/site-header/site-header.component';
import {TaskTableComponent} from '../components/task-table/task-table.component';
import {TaskTableElementComponent} from '../components/task-table/task-table-element/task-table-element.component';
import {TaskFormComponent} from '../components/task-form/task-form.component';
import {TaskTableHeaderComponent} from '../components/task-table/task-table-header/task-table-header.component';
import {EditTaskPageComponent} from '../pages/edit-task-page/edit-task-page.component';
import {AddTaskPageComponent} from '../pages/add-task-page/add-task-page.component';
import {CloseModalButtonComponent} from '../components/close-modal-button/close-modal-button.component';
import {LogoutButtonComponent} from '../components/logout-button/logout-button.component';
import {IncompleteTaskBadgeComponent} from '../components/incomplete-task-badge/incomplete-task-badge.component';
import {IncompleteTasksListComponent} from '../components/incomplete-tasks-list/incomplete-tasks-list.component';
import {PriorityChipComponent} from '../components/priority-chip/priority-chip.component';

@NgModule({
    declarations: [
        UserFormComponent,
        SiteHeaderComponent,
        TaskTableComponent,
        TaskTableElementComponent,
        TaskFormComponent,
        TaskTableHeaderComponent,
        EditTaskPageComponent,
        AddTaskPageComponent,
        CloseModalButtonComponent,
        LogoutButtonComponent,
        IncompleteTaskBadgeComponent,
        IncompleteTasksListComponent,
        PriorityChipComponent
    ],
    exports: [
        UserFormComponent,
        SiteHeaderComponent,
        TaskTableComponent,
        TaskTableElementComponent,
        TaskFormComponent,
        TaskTableHeaderComponent,
        EditTaskPageComponent,
        AddTaskPageComponent,
        CloseModalButtonComponent,
        LogoutButtonComponent,
        IncompleteTaskBadgeComponent,
        IncompleteTasksListComponent,
        PriorityChipComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        UserFormComponent,
        SiteHeaderComponent,
        TaskTableComponent,
        TaskTableElementComponent,
        TaskFormComponent,
        TaskTableHeaderComponent,
        EditTaskPageComponent,
        AddTaskPageComponent,
        CloseModalButtonComponent,
        LogoutButtonComponent,
        IncompleteTaskBadgeComponent,
        IncompleteTasksListComponent,
        PriorityChipComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]

})
export class ComponentsModule {
}
