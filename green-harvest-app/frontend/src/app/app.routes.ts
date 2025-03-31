import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';

export const appRoutes: Routes = [  // export appRoutes, not routes
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegistrationComponent },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];
