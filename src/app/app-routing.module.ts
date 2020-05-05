/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginGuard} from './guards/login.guard';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
    {
        path: 'home', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'login', canActivate: [LoginGuard],
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'register', canActivate: [LoginGuard],
        loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: '**',
        redirectTo: 'home',
        canActivate: [AuthGuard],
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
