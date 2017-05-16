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
  public sentList: FirebaseListObservable<any[]>;

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

      //1. Check if they are already friends or not


      //2. Check already friend request is sent or not






      let friendObservable = this.userService.getUserById(friendId);
      friendObservable.subscribe((friendProfile)=> {
        //get friend profile
        this.friendName = friendProfile.firstName + " " + friendProfile.lastName;


        //Get Friend Status
        let friendStatusObservable = this.userService.getFriendStatus(this.userId, this.friendId);

        //Get user Status
        let userStatusObservable = this.userService.getUserstatus(this.userId, this.friendId);

        let friendStatus = "";
        let userStatus = "";

        let promise1 = this.getFriendStatus(friendStatusObservable);
        let promise2 = this.getUserStatus(userStatusObservable);

        Promise.all([promise1,promise2]).then( (result)=>{
          console.log(result);
          if(result[0] === "null" && result[1] === "null"){
            //Both User and Friend have not sent friend request
            console.log("case1");
          }else if(result[0] === "false" && result[1] === "true"){
            //User sent friend request, but friend haven't responded yet
            console.log("case2");
          }else if(result[0] === "true" && result[1] === "false"){
            //friend sent friend request, but user haven't responded yet
            console.log("case3");
          }else if(result[0] === "true" && result[1] === "true"){
            //User and Friend are friend;
            console.log("case4");
          }
        });
      });
  }

  sendFriendRequest(){
    this.userService.sendFriendRequest(this.userId, this.friendId, this.friendName);
  }


  getAllFriendsRequestWaiting(){
    this.waitingList = [];
    let friendsRequestWaitingList = this.userService.getAllFriendsRequestWaiting(this.userId);

    friendsRequestWaitingList.subscribe((data)=>{
;
      let friendGroupIds = [];
      for(let i=0; i<data.length; i++){
        friendGroupIds.push(data[i].friendGroupId);
      }
      let friendsGroupResultArray = this.userService.getAllFriendsStatusWaiting(friendGroupIds);
      console.log("friendsGroupResultArray");
      console.log(friendsGroupResultArray);

      if(friendsGroupResultArray.length !== 0){
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
      console.log("all friends list");
      console.log(data);
    });
  }


  getAllSentFriendsRequest(){
    this.sentList = this.userService.getAllSentFriendsRequest(this.userId);
    this.sentList.subscribe((data)=>{
      console.log(data);
    });
  }

  updateFriendRequest(friendObject, response){
    this.userService.updateFriendRequest(this.userId, friendObject, response);
  }

  cancelFriendRequest(friendObject){
    this.userService.cancelFriendRequest(this.userId, friendObject);
  }

  getFriendStatus(friendStatusObservable){
    let promise = new Promise( (resolve) =>{

      friendStatusObservable.subscribe((result)=>{
        console.log("friend status");
        console.log(result);
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
        console.log(result);
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
