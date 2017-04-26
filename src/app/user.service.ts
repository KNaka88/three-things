import { Injectable } from '@angular/core';
import {AngularFire, AngularFireAuth, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class UserService {

  public userId: any;
  public userName: any;
  public userEmail: any;


  //path of firebase
  public diaries: FirebaseListObservable<any>;


  constructor(
    public af: AngularFire,
  ){ }


  //REGISTER to Firebase
  registerUser(email, password) {
    return this.af.auth.createUser({
      email: email,
      password: password,
    });
  }

  saveUserInfoFromForm(uid: string, firstName: string, lastName: string, email: string) {
  return this.af.database.object('users/' + uid).set({
    firstName: firstName,
    lastName: lastName,
    email: email
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



//READ
  getUserById(uid: string) {
    return this.af.database.object("users/" + uid);
  }

  getUser(uid: string) {
    return this.af.database.object('users/' + uid);
  }

  getUserIdBySearchKeyword(searchKeyword: string) {
    return this.af.database.list('/searchKeywords', {
      query: {
        orderByChild: 'searchKeyword',
        equalTo: searchKeyword
      }
    });
  }

//CREATE
  makeDiary(good1, good2, good3, privacyLevel, userId){
    let diary = {
      date: Date.now(),
      good1: good1,
      good2: good2,
      good3: good3,
      privacyLevel: privacyLevel
    }
    this.af.database.list('users/' + userId + '/diaries').push(diary);
  }

  registerSearchKeyword(searchKeyword, userId){
    return this.af.database.list('searchKeywords').push({
      userId: userId,
      searchKeyword: searchKeyword
    });
  }
}
