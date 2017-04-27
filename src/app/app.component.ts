import { Component  } from '@angular/core';
import { UserService } from './user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean; //if false, hide from nav bar

  constructor(public userService: UserService, private router: Router) {
    this.userService.af.auth.subscribe((auth) => {
        if (auth === null) {
          //if user is not logged in, navigate to welcome page
          this.isLoggedIn = false;
          this.router.navigate([""]);
        }else {
          this.isLoggedIn = true;
        }
    });
  }


  logout() {
    //hide logout button
    this.isLoggedIn = false;

    //log out from firebase
    this.userService.logout();
  }
}
