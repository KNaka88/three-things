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

  //display
  public verifyRequired: boolean = false;
  public isSent: boolean = false;


  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  //call userService login and access to firebase auth
  login(email, password) {
    this.userService.login(email, password).then((user) => {
      console.log(user);
      //check if user verified the email (boolean)
      if(user.emailVerified) {
        //true
        this.router.navigate(['user/' + user.uid]);
      }else{
        //false
        this.verifyRequired = true;
      }
    })
    .catch((error: any) => {
      if (error) {
        this.error = error;
        alert(error.message);
      }
    });
  }


  sendVerifyEmail(){
    console.log("clicked");
    this.userService.afAuth.authState.subscribe( (getAuth) => {
      this.isSent = true;
      getAuth.sendEmailVerification();
    });
  }
}
