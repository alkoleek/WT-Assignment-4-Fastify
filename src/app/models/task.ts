/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

export class Task {
    title: string;
    description: string;
    users: Array<string>;
    delivery: string;
    priority: number;
    inprogress: boolean;

    constructor(taskObj: {
        title: string,
        description: string,
        users: Array<string>,
        delivery: string,
        priority: number,
        inprogress: boolean
    }) {
        this.title = taskObj.title;
        this.description = taskObj.description;
        this.users = taskObj.users;
        this.delivery = taskObj.delivery;
        this.priority = taskObj.priority;
        this.inprogress = taskObj.inprogress;
    }
}
