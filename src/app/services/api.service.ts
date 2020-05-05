/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Token} from '../models/token';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Task} from '../models/task';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    apiBase = 'http://localhost:80';

    constructor(private httpClient: HttpClient, private auth: AuthService, private router: Router) {
    }

    logout() {
        this.auth.logout().then(() => {
            this.router.navigate(['login']);
        });
    }

    public editTask(task: Task): Observable<Task> {
        return this.httpClient.put<Task>(`${this.apiBase}/edittask`, task).pipe(catchError(err => {
            if (err.error.error === 'Invalid Token') {
                this.logout();
            }
            console.error('[Error] editTask', err);
            return throwError(err);
        }));
    }

    public addTask(task: Task): Observable<Task> {
        return this.httpClient.post<Task>(`${this.apiBase}/addtask`, task).pipe(catchError(err => {
            if (err.error.error === 'Invalid Token') {
                this.logout();
            }
            console.error('[Error] addTask', err);
            return throwError(err);
        }));
    }

    public rmTask(task: Task): Observable<object> {
        return this.httpClient.post<object>(`${this.apiBase}/rmtask`, task).pipe(catchError(err => {
            if (err.error.error === 'Invalid Token') {
                this.logout();
            }
            console.error('[Error] rmTask', err);
            return throwError(err);
        }));
    }

    public getTasks(): Observable<Array<Task>> {
        return this.httpClient.get<Array<Task>>(`${this.apiBase}/tasks`).pipe(catchError(err => {
            if (err.error.error === 'Invalid Token') {
                this.logout();
            }
            console.error('[Error] getTasks', err);
            return throwError(err);
        }));
    }

    public login(username: string, password: string): Observable<Token> {
        return this.httpClient.post<Token>(`${this.apiBase}/login`, {username, password}).pipe(catchError(err => {
            if (err.error.error === 'Invalid Token') {
                this.logout();
            }
            console.error('[Error] login', err);
            return throwError(err);
        }));
    }

    public register(username: string, password: string): Observable<Token> {
        return this.httpClient.post<Token>(`${this.apiBase}/register`, {username, password}).pipe(catchError(err => {
            if (err.error.error === 'Invalid Token') {
                this.logout();
            }
            console.error('[Register error]', err);
            return throwError(err);
        }));
    }

    public getUsers(): Observable<Array<string>> {
        return this.httpClient.get<Array<string>>(`${this.apiBase}/users`).pipe(catchError((err: HttpErrorResponse) => {
            if (err.error.error === 'Invalid Token') {
                this.logout();
            }
            console.error('[Get Users error]', err);
            return throwError(err);
        }));
    }
}
