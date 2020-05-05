/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

const TOKEN_HEADER_KEY = 'token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = this.auth.getToken();

        if (token != null) {
            authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, token)});
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
        deps: [AuthService]
    }
];
