import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../data-storage.service';
import { UserService } from '../user.service';
import { KeysPipe } from '../keys.pipe';

@Component({
  selector: 'app-friend-diary',
  templateUrl: './friend-diary.component.html',
  styleUrls: ['./friend-diary.component.css'],
  providers: [DataStorageService]
})
export class FriendDiaryComponent implements OnInit {
  @Input() friend: any;
  public friendProfile:any;
  public isProdEnvironment: any;
  public friendId: any;
  public friendAllDiaries: any;

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private userService: UserService,
    ){}

  ngOnInit() {
    this.friendId = this.friend.uid;
    this.showFriendAllDiaries();
  }

  showFriendAllDiaries(){
    this.userService.showFriendAllDiaries(this.friendId).subscribe( (diaries)=> {
      this.friendAllDiaries = diaries;
    });
  }

  showMonthlyDiary(year, month){
    console.log(year);
    console.log(month);
    let result = this.userService.getFriendMonthlyDiaries(this.friendId, year, month);
    result.subscribe((data)=>{
      console.log("data");
      console.log(data);
    });
  }

}
