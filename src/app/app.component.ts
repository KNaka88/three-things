import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;

  constructor(public userService: UserService, private router: Router) {

    this.userService.af.auth.subscribe(
      (auth) => {
        if (auth === null) {
          this.isLoggedIn = false;
          this.router.navigate([""]);
        }
        }
      );
    }


  logout() {
    this.userService.logout();
  }
}
