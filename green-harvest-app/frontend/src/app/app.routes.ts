import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'user-management', loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule) },
  { path: '', redirectTo: '/user-management/login', pathMatch: 'full' }
];