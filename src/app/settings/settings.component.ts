import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [UserService]
})
export class SettingsComponent implements OnInit {
  public userId: any;
  public userProfile: FirebaseObjectObservable<any>;
  public firstName: string;
  public lastName: string;
  public email: string;

  public searchKeyword: string;
  public isProfileSettingOpened: boolean = false;
  public message: string;

  public isAccountSettingOpened: boolean = false;
  //For Change password form: css handling
  public isChangePasswordFormOpened: boolean = false;
  public newPassword: string = '';
  public confirmPassword: string = '';
  public isPasswordMatch: boolean;
  public isPasswordLength: boolean;




  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
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
    });
  }

  ngDoCheck(){
    //if password length is more than 6, change color to green
    if(this.newPassword.length >= 6){
      this.isPasswordLength = true;
    }else{
      this.isPasswordLength = false;
    }

    //if password and confirm password matches, change color to green
    if (this.newPassword === this.confirmPassword && this.newPassword.length >= 6){
      this.isPasswordMatch = true;
    }else{
      this.isPasswordMatch = false;
    }

  }


  toggleProfileSetting(){
    this.isProfileSettingOpened = !this.isProfileSettingOpened;
    this.isAccountSettingOpened = false;
    this.message = "";
  }

  toggleAccountSetting(){
    this.isAccountSettingOpened = !this.isAccountSettingOpened;
    this.isProfileSettingOpened = false;
    this.message = "";
  }

  updateUserName(){
    let verified = (this.firstName && this.lastName);
    if(verified){
      let promise = this.userService.updateUserName(this.firstName, this.lastName, this.userId);
      promise
      .then(_ => {
        this.message = "Updated!";
        this.isProfileSettingOpened = false;
      })
      .catch(err => this.message = "Failed :(");
    }
  }

  confirm(email, password){

    //TODO: add credential -> then run update function

    let promise = new Promise((resolve) => {
      let credential = this.userService.getCredentials(email, password);
      resolve(credential);
    });


    promise.then( (credential) => {
      console.log(credential);
      this.userService.reauthenticate(credential).then( ()=> {
        //user reauthenticated
        console.log('reauthenticated success');
        this.isChangePasswordFormOpened = true;
      }), function(error){
        //error
        console.log(error);
      }
    });
  }


  updatePassword(){
    //check if form is typed correct
    let verified = (this.isPasswordMatch && this.isPasswordLength);

    if(verified){
      let update = this.userService.updatePassword(this.newPassword);
      update.then(()=>{
        //success

        //clear the form
        this.newPassword = '';
        this.confirmPassword = '';

        //close the form
        this.isChangePasswordFormOpened = false;
        this.isAccountSettingOpened = false;
        this.message = "Password Updated!"

        //show the success message
      }), function(error) {
        console.log('error');
      };
    }
  }

}


// console.log(success);
//
