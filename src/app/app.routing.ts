import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes: Routes = [
  {
   path: 'user/:id',
   component: IndexComponent
 },
 {
   path: '',
   component: WelcomeComponent
 }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
