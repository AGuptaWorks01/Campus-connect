import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full', // Full match for default redirect
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./Components/home/home.component').then((m) => m.HomeComponent),
  },
];
