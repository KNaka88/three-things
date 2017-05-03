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
    let year = new Date().getUTCFullYear();
    let month = new Date().getUTCMonth() + 1;
    this.af.database.list('diaries/' + userId + '/' + year + '/' + month).push(diary).then((result)=> {
      let diaryId = result["path"]["o"][4]; //get this diary's id
      this.af.database.list('users/' + userId + '/diaries/' + year + '/' + month).push(diaryId); //save path to users section
    });
  }

  registerSearchKeyword(searchKeyword, userId){
    return this.af.database.list('searchKeywords').push({
      userId: userId,
      searchKeyword: searchKeyword
    });
  }


  //Used at past-diaries.component
  showMyAllDiaries(userId){
    return this.af.database.list('diaries/' + userId);
  }



  //Used at past-diaries-year.component.ts
  getYearDiaries(userId, year){
    return this.af.database.list('diaries/' + userId + '/' + year);
  }

  //Used at past-diaries-year-month.component.ts
  getMonthlyDiaries(userId, year, month){
    return this.af.database.list('diaries/' + userId + '/' + year + '/' + month);
  }

  //Used at recent-diaries.component.ts
  getRecentDiaries(userId){
    let year = new Date().getUTCFullYear();
    let month = new Date().getUTCMonth() + 1;
    return this.af.database.list('diaries/' + userId + '/' + year + '/' + month, {
      query: {
        orderByChild: 'date',
        limitToLast: 3,
      }
    });
  }


  deleteDiary(userId, diary){
    let year =  new Date(diary.date).getUTCFullYear();
    let month = new Date(diary.date).getUTCMonth() + 1;
    this.af.database.list('/diaries/' + userId + '/' + year + '/' + month + '/' + diary.$key).remove();
  }

}
