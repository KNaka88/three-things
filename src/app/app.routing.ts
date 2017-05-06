import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateDiaryComponent } from './create-diary/create-diary.component';
import { WaitingConfirmationComponent } from './waiting-confirmation/waiting-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PastDiariesComponent } from './past-diaries/past-diaries.component';
import { PastDiariesYearMonthComponent} from './past-diaries-year-month/past-diaries-year-month.component';

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
   path: 'user/:id/make_diary',
   component: CreateDiaryComponent
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
   path: 'user/:id/past_diaries',
   component: PastDiariesComponent
 },
 {
   path: 'user/:id/past_diaries/:year/:month',
   component: PastDiariesYearMonthComponent
 }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
