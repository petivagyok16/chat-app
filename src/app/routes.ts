import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: '**', component: HomeComponent },
];