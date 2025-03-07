import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ClientsSelectedComponent } from './pages/clients-selected/clients-selected.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'clients-selected', component: ClientsSelectedComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
