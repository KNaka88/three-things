import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateDiaryComponent } from './create-diary/create-diary.component';
import { WaitingConfirmationComponent } from './waiting-confirmation/waiting-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PastDiariesComponent } from './past-diaries/past-diaries.component';
import { PastDiariesYearMonthComponent} from './past-diaries-year-month/past-diaries-year-month.component';
import { SettingsComponent } from './settings/settings.component';
import { FindFriendComponent } from './find-friend/find-friend.component';
import { FriendsDiaryComponent } from './friends-diary/friends-diary.component';
import { FriendDiaryComponent} from './friend-diary/friend-diary.component';

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
 },
 {
   path: 'user/:id/settings',
   component: SettingsComponent
 },
 {
   path: 'user/:id/find_friends',
   component: FindFriendComponent
 },
 {
   path: 'user/:id/friends_diary',
   component: FriendsDiaryComponent
 },
 {
   path: 'user/:id/friends_diary/:friendName',
   component: FriendDiaryComponent,
 }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
