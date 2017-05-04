import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  public userId: any;
  public userName: any;
  public userEmail: any;

  //path of firebase
  public diaries: FirebaseListObservable<any>;


  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
  ){ }


  //REGISTER to Firebase
  registerUser(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  saveUserInfoFromForm(uid: string, firstName: string, lastName: string, email: string) {
  return this.db.object('users/' + uid).set({
    firstName: firstName,
    lastName: lastName,
    email: email
  });
}


//User log in authentication
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }


//User log out authentication
  logout() {
    return firebase.auth().signOut();
  }



//READ
  getUserById(uid: string) {
    return this.db.object("users/" + uid);
  }

  getUser(uid: string) {
    return this.db.object('users/' + uid);
  }

  getUserIdBySearchKeyword(searchKeyword: string) {
    return this.db.list('/searchKeywords', {
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
    this.db.list('diaries/' + userId + '/' + year + '/' + month).push(diary).then((result)=> {
      let diaryId = result["path"]["o"][4]; //get this diary's id
      this.db.list('users/' + userId + '/diaries/' + year + '/' + month).push(diaryId); //save path to users section
    });
  }

  registerSearchKeyword(searchKeyword, userId){
    return this.db.list('searchKeywords').push({
      userId: userId,
      searchKeyword: searchKeyword
    });
  }


  //Used at past-diaries.component
  showMyAllDiaries(userId){
    return this.db.list('diaries/' + userId);
  }



  //Used at past-diaries-year.component.ts
  getYearDiaries(userId, year){
    return this.db.list('diaries/' + userId + '/' + year);
  }

  //Used at past-diaries-year-month.component.ts
  getMonthlyDiaries(userId, year, month){
    return this.db.list('diaries/' + userId + '/' + year + '/' + month);
  }

  //Used at recent-diaries.component.ts
  getRecentDiaries(userId){
    let year = new Date().getUTCFullYear();
    let month = new Date().getUTCMonth() + 1;
    return this.db.list('diaries/' + userId + '/' + year + '/' + month, {
      query: {
        orderByChild: 'date',
        limitToLast: 3,
      }
    });
  }


  deleteDiary(userId, diary){
    let year =  new Date(diary.date).getUTCFullYear();
    let month = new Date(diary.date).getUTCMonth() + 1;
    this.db.list('/diaries/' + userId + '/' + year + '/' + month + '/' + diary.$key).remove();
  }

}
