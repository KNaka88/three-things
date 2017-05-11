import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

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
  public isAccountSettingOpened: boolean = false;
  public message: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
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

  toggleProfileSetting(){
    this.isProfileSettingOpened = !this.isProfileSettingOpened;
  }

  toggleAccountSetting(){
    this.isAccountSettingOpened = !this.isAccountSettingOpened;
  }

  updateUserName(){
    let promise = this.userService.updateUserName(this.firstName, this.lastName, this.userId);
    promise
    .then(_ => this.message = "Updated!")
    .catch(err => this.message = "Failed :(");
  }

  confirm(password){

    //TODO: add credential -> then run update function


    let update = this.userService.updatePassword(password);
    update.then(()=>{
      //success
      console.log("success");
    }), function(error) {
      console.log('error');
    };

  }
}
