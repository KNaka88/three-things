import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageService {

  constructor() { }

  public friendProfile: any;


  get isEmpty(): boolean {
    return this.friendProfile === null || this.friendProfile === undefined;
  }

  setFriendProfile(friend){
    this.friendProfile = friend;
    console.log("set");
    console.log(this.friendProfile);
  }

  getFriendProfile(){
    return this.friendProfile;
  }
}
