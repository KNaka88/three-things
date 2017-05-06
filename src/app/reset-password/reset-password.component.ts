import * as firebase from 'firebase';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [UserService],
})
export class ResetPasswordComponent implements OnInit {
  public isSubmitted: boolean = false;
  public message: any;

  constructor(
    private userService: UserService,
  ) { }
  ngOnInit() {
  }

  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email).then( value => {
      console.log(value);
      this.isSubmitted = true;
      this.message = "Sent!";
    }, reason => {
      this.isSubmitted = true;
      this.message = "Please type correct email address";
    });
}

}
