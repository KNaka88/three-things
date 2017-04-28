import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
import { KeysPipe } from '../keys.pipe';
import { ImageCyclePipe } from '../image-cycle.pipe';
import {ShareButtonsModule} from 'ng2-sharebuttons';

@Component({
  selector: 'app-past-diaries-year-month',
  templateUrl: './past-diaries-year-month.component.html',
  styleUrls: ['./past-diaries-year-month.component.css'],
  providers: [UserService]
})

export class PastDiariesYearMonthComponent implements OnInit {
  public userId: any;
  public year: any;
  public month: any;
  public monthlyDiaries: FirebaseListObservable<any>;
  public arrayOfKeys;
  public link: any = "www.facebook.com";
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
      this.year = urlParameters['year'];
      //setting diary month to local variable
      this.month = urlParameters['month'];

      //getting diaries of specific year
      this.monthlyDiaries = this.userService.getMonthlyDiaries(this.userId, this.year, this.month);

    });
  }
}
