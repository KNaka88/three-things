import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { KeysPipe } from '../keys.pipe';
import { ActivatedRoute } from '@angular/router';
import { MonthNumberToWordPipe } from '../month-number-to-word.pipe';
@Component({
  selector: 'app-past-diaries',
  templateUrl: './past-diaries.component.html',
  styleUrls: ['./past-diaries.component.css'],
  providers: [UserService]
})
export class PastDiariesComponent implements OnInit {
  public myAllDiaries: any;
  public userId: any;


  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //getting user id from url
    this.route.params.forEach((urlParameters) => {
      //setting user id to local variable
    this.userId = urlParameters['id'];
    });

    this.showMyAllDiaries();
  }

  showMyAllDiaries(){
      this.userService.showMyAllDiaries(this.userId).subscribe( (diaries)=> {
        this.myAllDiaries = diaries;
      });
  }
}
