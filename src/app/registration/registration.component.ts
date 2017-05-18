import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [UserService]
})
export class RegistrationComponent implements OnInit {

  //For register to firebase
  public error: any;

  //For registration form
  public displayError: any;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string = '';
  public confirmPassword: string = '';
  public searchKeyword: string;

  //For registration form: css handling
  public isPasswordMatch: boolean;
  public isPasswordLength: boolean;
  public isEmailVerified: boolean;
  public emailValidation: RegExp = new RegExp( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }


  ngDoCheck(){
    //if password length is more than 6, change color to green
    if(this.password.length >= 6){
      this.isPasswordLength = true;
    }else{
      this.isPasswordLength = false;
    }

    //if password and confirm password matches, change color to green
    if (this.password === this.confirmPassword && this.password.length >= 6){
      this.isPasswordMatch = true;
    }else{
      this.isPasswordMatch = false;
    }

    //if email is valid format, change color to green
    if(this.emailValidation.test(this.email)){
      this.isEmailVerified = true;
    }else {
      this.isEmailVerified = false;
    }
  }


  registerUser(){
    //check if form is typed correct
    let verified = (this.firstName && this.lastName && this.isPasswordMatch && this.isPasswordLength && this.isEmailVerified);

    if(verified){
      this.userService.registerUser(this.email, this.password).then( (user) => {
        this.userService.saveUserInfoFromForm(user.uid, this.firstName, this.lastName, this.email).then(() => {
          this.userService.afAuth.authState.subscribe( (getAuth) => {
            getAuth.sendEmailVerification().then( () => {
              this.router.navigate(['user/' + user.uid]);
            });
          });
        })
        // when register user method failed, catch error
        .catch((error) => {
          this.error = error;
          alert(error.message);
        });
      })
      // when register method failed, catch error
      .catch((error) => {
        this.error = error;
        alert(error.message);
      });
    }else {
      alert('Please type all necessary information');
    }
  }
}
