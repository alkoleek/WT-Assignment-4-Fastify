/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './modules/components.module';
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {authInterceptorProviders} from './interceptors/auth.interceptor';
import {tokenInterceptorProviders} from './interceptors/token.interceptor';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [HttpClientModule, ComponentsModule, BrowserModule, NgxWebstorageModule.forRoot(),
        IonicModule.forRoot({
            mode: 'md'
        }), AppRoutingModule],
    providers: [
        StatusBar,
        SplashScreen,
        ApiService,
        AuthService,
        authInterceptorProviders,
        tokenInterceptorProviders,
        HttpClient,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
