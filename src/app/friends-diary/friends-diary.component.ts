import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-friends-diary',
  templateUrl: './friends-diary.component.html',
  styleUrls: ['./friends-diary.component.css']
})
export class FriendsDiaryComponent implements OnInit {
@Output() friendProfileSender = new EventEmitter();
public userId: string;
public friendsListObservable: any;
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

    let friendsList = this.userService.getAllFriendsList(this.userId);
    this.friendsListObservable = [];


    friendsList.subscribe((result)=> {
      result.forEach( (element)=> {
        let friendId = element.friendId;
        let result = this.userService.getUserById(friendId);
        this.friendsListObservable.push(result);

        result.subscribe((element)=>{
          console.log(element);
        });
      });
    });
  }

  sendFriendProfile(friend){
    this.friendProfileSender.emit(friend);
  }

}
