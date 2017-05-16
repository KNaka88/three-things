import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './user.service';
import { ImageManagementService } from './image-management.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrationComponent } from './registration/registration.component';
import { WaitingConfirmationComponent } from './waiting-confirmation/waiting-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PastDiariesComponent } from './past-diaries/past-diaries.component';
import { KeysPipe } from './keys.pipe';
import { PastDiariesYearMonthComponent } from './past-diaries-year-month/past-diaries-year-month.component';
import { MonthNumberToWordPipe } from './month-number-to-word.pipe';
import { ImageCyclePipe } from './image-cycle.pipe';
import { RecentDiariesComponent } from './recent-diaries/recent-diaries.component';
import { ReversePipe } from './reverse.pipe';
import { CreateDiaryComponent } from './create-diary/create-diary.component';
import { MdlUppgradeElementDirective } from './mdl-uppgrade-element.directive';
import { SettingsComponent } from './settings/settings.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeNameComponent } from './change-name/change-name.component';
import { FindFriendComponent } from './find-friend/find-friend.component';
import { ConfirmWaitingPipe } from './confirm-waiting.pipe';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    WelcomeComponent,
    RegistrationComponent,
    WaitingConfirmationComponent,
    ResetPasswordComponent,
    PastDiariesComponent,
    KeysPipe,
    PastDiariesYearMonthComponent,
    MonthNumberToWordPipe,
    ImageCyclePipe,
    RecentDiariesComponent,
    ReversePipe,
    CreateDiaryComponent,
    MdlUppgradeElementDirective,
    SettingsComponent,
    DeleteAccountComponent,
    ChangePasswordComponent,
    ChangeNameComponent,
    FindFriendComponent,
    ConfirmWaitingPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [UserService, ImageManagementService],
  bootstrap: [AppComponent]

})
export class AppModule { }
