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


  registerUserButton(firstName, lastName, email, password, birthday, sex){
    this.userService.registerUser(email, password).then( (user) => {
      this.userService.saveUserInfoFromForm(user.uid, firstName, lastName, email, birthday, sex).then(() => {
        this.router.navigate(['user/' + user.uid]);
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
