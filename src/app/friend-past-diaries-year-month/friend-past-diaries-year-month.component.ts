import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database';
import { KeysPipe } from '../keys.pipe';

@Component({
  selector: 'app-friend-past-diaries',
  templateUrl: './friend-past-diaries-year-month.component.html',
  styleUrls: ['./friend-past-diaries-year-month.component.css']
})
export class FriendPastDiariesYearMonthComponent implements OnInit {
  @Input() friendFilteredDiaries: any;
  public userId: any;
  public year: any;
  public month: any;
  public diaries: FirebaseListObservable<any>;
  public isFormVisible: boolean = false;
  public thisForm: number = null;
  public good1: string;
  public good2: string;
  public good3: string;
  public privacyLevel: string = "onlyMe";
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }


}
