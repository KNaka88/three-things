import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public error: any;

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  //call userService login and access to firebase auth
  login(email, password) {
    this.userService.login(email, password).then((data) => {

      //check if user verified the email (boolean)
      if(this.userService.checkEmailVerified()) {
        //true
        this.router.navigate(['user/' + data.uid]);
      }else{
        //false
        this.router.navigate(['email_confirm_waiting']);
      }
    })
    .catch((error: any) => {
      if (error) {
        this.error = error;
        alert(error.message);
      }
    });
  }
}
