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
  public error: any;
  public displayError: any;
  public submitted = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }


  validationCheck(firstName, lastName, email, password, confirmPassword, searchKeyword){
    //check if password is typed correct
    if(password === confirmPassword){

      let firstNameInput = firstName;
      let lastNameInput = lastName;
      let emailInput = email;
      let passwordInput = password;
      let searchKeywordInput = searchKeyword;

        //check if searchKeyword is already exist
        this.userService.getUserIdBySearchKeyword(searchKeyword).subscribe( (result) => {
          //if there no searchKeyword exists
          if(result.length === 0){
            this.registerUser(firstNameInput, lastNameInput, emailInput, passwordInput, searchKeywordInput);
          }else{
            this.displayError = "This keyword already exists. Try another keyword"
          }
        });
    }else {
      //when password does not match
      this.displayError = "Password doesn't match";
    }
  }


  registerUser(firstName, lastName, email, password, searchKeyword){

    this.userService.registerUser(email, password).then( (user) => {
      this.userService.saveUserInfoFromForm(user.uid, firstName, lastName, email, searchKeyword).then(() => {

        //save searchKeyword to firebase
        this.userService.registerSearchKeyword(searchKeyword, user.uid).then(() => {
          this.userService.af.auth.subscribe( (getAuth) => {
            getAuth.auth.sendEmailVerification().then( () => {
              this.router.navigate(['email_confirm_waiting']);
            });
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
}
