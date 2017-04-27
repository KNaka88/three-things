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
  public sent: boolean = false;

  constructor(
    private userService: UserService,
  ) { }
  ngOnInit() {
  }

  resetPassword(email: string): firebase.Promise<any> {
    this.sent = true;
    return firebase.auth().sendPasswordResetEmail(email);
}

}
