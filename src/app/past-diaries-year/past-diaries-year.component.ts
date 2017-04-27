import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
import { KeysPipe } from '../keys.pipe';

@Component({
  selector: 'app-past-diaries-year',
  templateUrl: './past-diaries-year.component.html',
  styleUrls: ['./past-diaries-year.component.css'],
  providers: [UserService]
})
export class PastDiariesYearComponent implements OnInit {
  public userId: any;
  public diaryYear: any;
  public yearDiaries: FirebaseListObservable<any>;
  public arrayOfKeys;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    //getting user id from url
    this.route.params.forEach((urlParameters) => {
      //setting user id to local variable
      this.userId = urlParameters['id'];
      //setting diary year to local variable
      this.diaryYear = urlParameters['year'];

      //getting diaries of specific year
      this.yearDiaries = this.userService.getYearDiaries(this.userId, this.diaryYear);
    });
  }

}
