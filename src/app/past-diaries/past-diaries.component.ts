import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { KeysPipe } from '../keys.pipe';

@Component({
  selector: 'app-past-diaries',
  templateUrl: './past-diaries.component.html',
  styleUrls: ['./past-diaries.component.css'],
  providers: [UserService]
})
export class PastDiariesComponent implements OnInit {
  public myAllDiaries: any;

 @Input()userId;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  showMyAllDiaries(){
      this.userService.showMyAllDiaries(this.userId).subscribe( (diaries)=> {
        this.myAllDiaries = diaries;
        console.log(this.myAllDiaries);
      });
  }
}
