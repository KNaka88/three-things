import { Component  } from '@angular/core';
import { UserService } from './user.service';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { MdlUppgradeElementDirective } from './mdl-uppgrade-element.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean; //if false, hide from nav bar
  public userId: any;

  constructor(public userService: UserService, private router: Router) {
    this.userService.afAuth.authState.subscribe((auth) => {
        if (auth === null) {
          //if user is not logged in, navigate to welcome page
          this.isLoggedIn = false;
          this.router.navigate([""]);
        }else {
          this.userId = auth.uid;
          this.isLoggedIn = true;
          this.router.navigate(["user/"+ this.userId]);
        }
    });
  }

  logout() {
    //log out from firebase
    this.userService.logout();
  }
}
