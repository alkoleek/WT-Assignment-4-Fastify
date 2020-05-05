/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

export class User {
    username: string;
    password: string;

    constructor(userObj: { username: string, password: string }) {
        this.username = userObj.username;
        this.password = userObj.password;
    }
}
