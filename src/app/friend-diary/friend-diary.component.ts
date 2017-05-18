import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { KeysPipe } from '../keys.pipe';

@Component({
  selector: 'app-friend-diary',
  templateUrl: './friend-diary.component.html',
  styleUrls: ['./friend-diary.component.css'],
})
export class FriendDiaryComponent implements OnInit {
  @Input() friend: any;
  public friendProfile:any;
  public isProdEnvironment: any;
  public friendId: any;
  public friendAllDiaries: any;
  public friendFilteredDiaries: any;
  public friendPastDiariesOpened: boolean = false;

  constructor(
    private route: ActivatedRoute,
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
    this.friendFilteredDiaries = this.userService.getFriendMonthlyDiaries(this.friendId, year, month);
    this.friendPastDiariesOpened = true;
  }

}
