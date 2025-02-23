import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '/',
        loadComponent: () => import('./app.component'),
    },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    }
];
