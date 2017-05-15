import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-find-friend',
  templateUrl: './find-friend.component.html',
  styleUrls: ['./find-friend.component.css']
})
export class FindFriendComponent implements OnInit {
  public friendSearchKeyword: string;
  public userId:string;
  public displayError:string;

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
  }

  searchFriend(){
    let getFriendIdPromise = this.getFriendId();

    getFriendIdPromise
    .then((friendId) => {
      console.log(friendId);
    });
  }


  getFriendId(){
    let promise = new Promise((resolve) => {

      let friendSearchKeyword = this.friendSearchKeyword.toLowerCase();
      let includeWhiteSpace = /\s/g.test(friendSearchKeyword);

      if(includeWhiteSpace){
        this.displayError = "White space is not allowed";
      }else{
        let friendIdObservable = this.userService.getUserIdBySearchKeyword(friendSearchKeyword);


        friendIdObservable.subscribe((result) => {
          if(result.length === 0){
            this.displayError = "No Result";
          }else if(result[0].userId === this.userId){
            this.displayError = "We found you, not your friend :D";
          }else{
            resolve(result[0].userId);
          }
        });
      }
    });
    return promise;
  }

}
