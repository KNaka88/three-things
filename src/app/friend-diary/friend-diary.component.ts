import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-friend-diary',
  templateUrl: './friend-diary.component.html',
  styleUrls: ['./friend-diary.component.css']
})
export class FriendDiaryComponent implements OnInit {
  @Input() friendProfileSender: any;
  public friendProfile:any;

  constructor() { }

  ngOnInit() {
    console.log(this.friendProfile);
  }

}
