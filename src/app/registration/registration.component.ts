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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
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
          console.log(result);
          //if there no searchKeyword exists
          if(result.length === 0){
            console.log("no match");

            this.registerUser(firstNameInput, lastNameInput, emailInput, passwordInput, searchKeywordInput);
          }else{
            console.log("this keyword already exists");
          }
        });
    }else {
      console.log("password doesn't match");
    }
  }

  registerUser(firstName, lastName, email, password, searchKeyword){

    this.userService.registerUser(email, password).then( (user) => {
      this.userService.saveUserInfoFromForm(user.uid, firstName, lastName, email, searchKeyword).then(() => {

        //save searchKeyword to firebase
        this.userService.registerSearchKeyword(searchKeyword, user.uid).then(() => {
          this.router.navigate(['user/' + user.uid]);
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
