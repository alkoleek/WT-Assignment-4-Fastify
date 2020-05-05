/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token = null;

    constructor(private storage: LocalStorageService) {
        this.token = this.getTokenFromStorage() as string;
    }

    private getTokenFromStorage(): string {
        return (this.storage.retrieve('token') as string);
    }

    async setToken(token: string | null) {
        this.token = token;
        this.storage.store('token', token);
    }

    getToken(): string {
        return this.token;
    }

    isAuth(): boolean {
        return (this.token !== null);
    }

    logout() {
        return (this.setToken(null));
    }
}
