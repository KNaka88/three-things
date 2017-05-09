import { Component, OnInit, NgModule } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [UserService]
})
export class IndexComponent implements OnInit {
  public userId: any;
  public userName: any;
  public userEmail: any;
  public user: FirebaseObjectObservable<any>;
  public today: number;

  public good1: string;
  public good2: string;
  public good3: string;
  public privacyLevel: string = "onlyMe";

  public isDiaryFormOpened: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    //getting user id from url
    this.route.params.forEach((urlParameters) => {
      //setting user id to local variable
      this.userId = urlParameters['id'];
    });

    //getting user FirebaseListObservable
    this.user = this.userService.getUser(this.userId);

    //setting current date
    this.today = Date.now();

  }


  showDiaryForm() {
    this.isDiaryFormOpened = true;
  }
}
