import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css']
})
export class ChangeNameComponent implements OnInit {
  @Output() messageSender = new EventEmitter();
  public userId: any;
  public firstName: string;
  public lastName: string;
  public email: string;
  public userProfile: FirebaseObjectObservable<any>;
  public searchKeyword: string = "";
  public searchKeywordRegistered: boolean = false;
  public displayError: string;
  public completeSearchKeyword: string;
  // public isProfileSettingOpened: boolean = false;



  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    //getting user id from url
    this.route.params.forEach((urlParameters) => {
      //setting user id to local variable
      this.userId = urlParameters['id'];
    });

    this.userProfile = this.userService.getUserById(this.userId);
    this.userProfile.subscribe((profile)=> {
      this.firstName = profile.firstName;
      this.lastName =  profile.lastName;
      this.email = profile.email;
      this.completeSearchKeyword = profile.searchKeyword;

      if(profile.searchKeyword !== undefined){
        this.searchKeywordRegistered = true;
      }

    });

  }

  updateUserName(){

    let searchKeywordCheckPromise = this.checkIfSearchKeywordCanUse();
    let verified = (this.firstName && this.lastName);

    if(verified){
      searchKeywordCheckPromise.then( (result)=> {

        //if searchKeyword is available or empty, run this program
        let promise1 = this.userService.updateUserName(this.firstName, this.lastName, this.userId, this.searchKeyword);

        let promise2 = this.userService.registerSearchKeyword(this.userId, this.searchKeyword);

        Promise.all([promise1, promise2])
        .then(_ => {
          this.messageSender.emit("Updated!");
          // this.isProfileSettingOpened = false;
        })
        .catch(err => this.messageSender.emit("Failed :("));
      });

    } else {
      //user blanked either first or last name
      this.displayError = "Please type your name";
    }

  }


  checkIfSearchKeywordCanUse(){
    let searchKeyword = this.searchKeyword.toLowerCase();

    let includeWhiteSpace = /\s/g.test(searchKeyword);

    let promise = new Promise((resolve) => {

      let userIdObservable = this.userService.getUserIdBySearchKeyword(searchKeyword);

      if(searchKeyword === ""){
        //If user doesn't type anything, return true
        resolve("no input");

      }else{
        //check if searchKeyword is already exist
        userIdObservable.subscribe( (result) => {
          console.log(result);
          if(includeWhiteSpace){
            this.displayError = "White space is not allowed";
          }else if(result.length === 0){
            //if there no searchKeyword exists
            resolve("can use");
          }else{
            this.displayError = "This keyword already exists";
            searchKeyword = "";
          }
        });
      }
    });

    return promise;
  }






}
