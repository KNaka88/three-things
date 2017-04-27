import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WaitingConfirmationComponent } from './waiting-confirmation/waiting-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PastDiariesComponent } from './past-diaries/past-diaries.component';
const appRoutes: Routes = [
 {
   path: 'user/:id',
   component: IndexComponent
 },
 {
   path: '',
   component: WelcomeComponent
 },
 {
   path: 'email_confirm_waiting',
   component: WaitingConfirmationComponent
 },
 {
   path: 'reset_password',
   component: ResetPasswordComponent
 },
 {
   path: 'past_diaries',
   component: PastDiariesComponent 
 }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
