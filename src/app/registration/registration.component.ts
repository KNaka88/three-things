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


  // validationCheck(){
  //   //check if password is typed correct
  //   let verified = (this.isPasswordMatch && this.isPasswordLength && this.isEmailVerified);
  //
  //   if(verified){
  //     console.log("verified");
  //       //check if searchKeyword is already exist
  //       this.userService.getUserIdBySearchKeyword(this.searchKeyword).subscribe( (result) => {
  //         //if there no searchKeyword exists
  //         if(result.length === 0){
  //           this.registerUser(this.firstName, this.lastName, this.email, this.password, this.searchKeyword);
  //         }else{
  //           this.displayError = "This keyword already exists. Try another keyword"
  //         }
  //       });
  //   }
  // }


  registerUser(){
    this.userService.registerUser(this.email, this.password).then( (user) => {
      this.userService.saveUserInfoFromForm(user.uid, this.firstName, this.lastName, this.email).then(() => {
          this.userService.af.auth.subscribe( (getAuth) => {
            getAuth.auth.sendEmailVerification().then( () => {
              this.router.navigate(['email_confirm_waiting']);
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



}
