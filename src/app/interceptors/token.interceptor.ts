/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {HTTP_INTERCEPTORS, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    urlsToUse = [
        'register',
        'login'
    ];

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.isValidRequestForInterceptor(req.url)) {
            return next.handle(req).pipe(
                tap((data) => {
                    if (data instanceof HttpResponse) {
                        if (data.body.hasOwnProperty('token')) {
                            this.auth.setToken(data.body.token);
                        }
                    }
                }));
        } else {
            return next.handle(req);
        }
    }

    private isValidRequestForInterceptor(requestUrl: string): boolean {
        for (const address of this.urlsToUse) {
            if (new RegExp(address).test(requestUrl)) {
                return true;
            }
        }
        return false;
    }
}

export const tokenInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true,
        deps: [AuthService]
    }
];
