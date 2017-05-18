import { Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Router} from "@angular/router";


@Component({
  selector: 'app-friends-diary',
  templateUrl: './friends-diary.component.html',
  styleUrls: ['./friends-diary.component.css'],
})
export class FriendsDiaryComponent implements OnInit {
public userId: string;
public friendsList:any;
public isFriendPageOpened:boolean = false;
public friend: any;

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

    let friendsList = this.userService.getAllFriendsList(this.userId);
    this.friendsList = [];


    friendsList.subscribe((result)=> {
      result.forEach( (element)=> {
        let friendId = element.friendId;
        let result = this.userService.getUserById(friendId);
        result.subscribe((element)=>{
          this.friendsList.push(element);
        });
      });
    });
  }

  openFriendPage(friend){
    this.friend = friend;
    this.isFriendPageOpened =  true;
    this.userService.getFriendDiary(friend.uid).subscribe((result)=>{
    });


  }

}
