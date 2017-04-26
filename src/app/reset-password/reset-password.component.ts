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

  constructor(
    private userService: UserService,
  ) { }



  ngOnInit() {
  }

  // passwordReset(email:String){
  //     this.userService.af.sendPasswordResetEmail(email).then( (data)=> {
  //       console.log(data);
  //     });
  // }

  resetPassword(email: string): firebase.Promise<any> {
  return firebase.auth().sendPasswordResetEmail(email).then( (result) => {
    console.log(result);
  });
}

}
