import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ConfirmWaitingPipe } from '../confirm-waiting.pipe';
import { SentRequestsPipe } from '../sent-requests.pipe';
@Component({
  selector: 'app-find-friend',
  templateUrl: './find-friend.component.html',
  styleUrls: ['./find-friend.component.css']
})
export class FindFriendComponent implements OnInit {
  public friendSearchKeyword: string;
  public userId:string;
  public displayError:string;
  public friendName: string;
  public friendId: string;
  public waitingList = [];
  public allFriendsList = [];
  public sentList: FirebaseListObservable<any[]>;
  public notFriend: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    //getting user id from url
    this.route.params.forEach((urlParameters) => {
      //setting user id to local variable
      this.userId = urlParameters['id'];

      this.getAllFriendsRequestWaiting();
      this.getAllFriendsList();
    });
  }

  searchFriend(){
    this.displayError = "";
    this.friendName = "";
    let getFriendIdPromise = this.getFriendId();

    getFriendIdPromise
    .then((friendId) => {
      this.checkIfTheyAreFriends(friendId);
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
            this.friendId = result[0].userId;
            resolve(result[0].userId);
          }
        });
      }
    });
    return promise;
  }

  checkIfTheyAreFriends(friendId){
    let friends = false;
    let waiting = false;

      // 1. Check if they are already friends or not
      this.allFriendsList.forEach((elements)=> {
        elements.forEach((element)=>{
          if(element.$value === friendId){
            friends = true;
          }
        });
      });

      //2. Check already friend request is sent or not
      this.waitingList.forEach((elements)=> {
        elements.forEach((element)=>{
          if(element.$value === friendId){
            waiting = true;
          }
        });
      });

      if( friends || waiting ){
          //They are either friends or already send friend request

      }else {
        this.notFriend = true;
      }

      let friendObservable = this.userService.getUserById(friendId);
      friendObservable.subscribe((friendProfile)=> {
        //get friend profile
        this.friendName = friendProfile.firstName + " " + friendProfile.lastName;

      });
  }

  sendFriendRequest(){
    this.userService.sendFriendRequest(this.userId, this.friendId, this.friendName);
    this.notFriend = false;
  }


  getAllFriendsRequestWaiting(){
    let friendsRequestWaitingList = this.userService.getAllFriendsRequestWaiting(this.userId);

    friendsRequestWaitingList.subscribe((data)=>{

      let friendGroupIds = [];
      for(let i=0; i<data.length; i++){
        friendGroupIds.push(data[i].friendGroupId);
      }
      let friendsGroupResultArray = this.userService.getAllFriendsStatus(friendGroupIds);

      if(friendsGroupResultArray.length !== 0){
        this.waitingList = [];
        friendsGroupResultArray.forEach( (elem)=> {
          elem.subscribe( (res) => {
            this.waitingList.push(res);
            console.log(this.waitingList);
          });
        });
      }
    });
  }


  getAllFriendsList(){

    let friendsList = this.userService.getAllFriendsList(this.userId);
    friendsList.subscribe((data)=> {
      console.log('data');
      console.log(data);
      let friendGroupIds = [];
      for(let i=0; i<data.length; i++){
        friendGroupIds.push(data[i].friendGroupId);
      }
      let friendsGroupResultArray = this.userService.getAllFriendsStatus(friendGroupIds);

      if(friendsGroupResultArray.length !== 0){
        this.allFriendsList = [];
        friendsGroupResultArray.forEach( (elem)=> {
          elem.subscribe( (res) => {
            this.allFriendsList.push(res);
          });
        });
      }
    });
  }

  // cancelFriendRequest(friendGroup){
  //   this.userService.cancelFriendRequest(this.userId, friendGroup);
  // }

  acceptFriendRequest(friendGroup){
    this.userService.acceptFriendRequest(this.userId, friendGroup);

    this.getAllFriendsRequestWaiting();
    this.getAllFriendsList();
  }

  getFriendStatus(friendStatusObservable){
    let promise = new Promise( (resolve) =>{

      friendStatusObservable.subscribe((result)=>{
        if(result.length === 0){
          resolve("null");
        }else{
          //TRUE or FALSE
          resolve(result[0].status);
        }
      });
    });
    return promise;
  }

  getUserStatus(userStatusObservable){
    let promise = new Promise( (resolve) =>{

      userStatusObservable.subscribe((result)=>{
        if(result.length === 0){
          resolve("null");
        }else{
          //TRUE or FALSE
          resolve(result[0].status);
        }
      });
    });
    return promise;
  }

}
