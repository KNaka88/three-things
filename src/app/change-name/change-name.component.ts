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
    });

  }

  updateUserName(){
    let verified = (this.firstName && this.lastName);
    if(verified){
      let promise = this.userService.updateUserName(this.firstName, this.lastName, this.userId);
      promise
      .then(_ => {
        this.messageSender.emit("Updated!");
        // this.isProfileSettingOpened = false;
      })
      .catch(err => this.messageSender.emit("Failed :("));
    }
  }

}
