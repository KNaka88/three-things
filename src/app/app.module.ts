import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { UserService } from './user.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrationComponent } from './registration/registration.component';
import { WaitingConfirmationComponent } from './waiting-confirmation/waiting-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PastDiariesComponent } from './past-diaries/past-diaries.component';
import { PastDiariesYearComponent } from './past-diaries-year/past-diaries-year.component';
import { KeysPipe } from './keys.pipe';
import { PastDiariesYearMonthComponent } from './past-diaries-year-month/past-diaries-year-month.component';

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
    PastDiariesYearComponent,
    KeysPipe,
    PastDiariesYearMonthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]

})
export class AppModule { }
