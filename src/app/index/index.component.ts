import { Component, OnInit, NgModule } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
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
  public privacyLevel: string = "onlyMe";
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    // private params: Params,
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



  makeDiary(good1, good2, good3, privacyLevel){
    this.userService.makeDiary(good2, good2, good3, privacyLevel, this.userId);
  }

  setPrivacyLevel(privacyLevel){
    this.privacyLevel = privacyLevel;
  }

}
