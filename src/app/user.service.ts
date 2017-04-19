import { Injectable } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class UserService {


  public userName: any;
  public userEmail: any;


  constructor(
    public af: AngularFire
  ) { }


  //REGISTER to Firebase
  registerUser(email, password) {
    return this.af.auth.createUser({
      email: email,
      password: password,
    });
  }

  saveUserInfoFromForm(uid: string, firstName: string, lastName: string, email: string, birthday: number, sex: string) {
  return this.af.database.object('users/' + uid).set({
    firstName: firstName,
    lastName: lastName,
    email: email,
    birthday: birthday,
    sex: sex
  });
}


//User log in authentication
  login(email, password) {
    return this.af.auth.login(
      {
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      });
  }


//User log out authentication
  logout() {
    return this.af.auth.logout();
  }






  getUserById(uid: string) {
    return this.af.database.object("users/" + uid);
  }

  getUser(uid: string) {
  return this.af.database.object('users/' + uid);
  }


}
