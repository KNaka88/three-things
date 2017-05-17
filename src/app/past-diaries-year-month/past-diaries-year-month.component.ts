import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database';
import { KeysPipe } from '../keys.pipe';
import { ImageCyclePipe } from '../image-cycle.pipe';

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
  public diaries: FirebaseListObservable<any>;
  public isFormVisible: boolean = false;
  public thisForm: number = null;
  public good1: string;
  public good2: string;
  public good3: string;
  public privacyLevel: string = "onlyMe";
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
      this.diaries = this.userService.getMonthlyDiaries(this.userId, this.year, this.month);
    });
  }

  editDiary(diary, formNumber){
    //Initialize value of thisForm (only once)
    if(this.thisForm === null){
      this.thisForm = formNumber;
    }

    if(this.thisForm !== formNumber){
      console.log("false!!");
      //When User clicked another EDIT button, run this program

      //Close Previous Form
      let thisCard = document.getElementById("card-" + this.thisForm);
      let editForm = document.getElementById("edit-form-" + this.thisForm);
      thisCard.style.display = "block";
      editForm.style.display = "none";

      //clear the input form
      this.good1 = "";
      this.good2 = "";
      this.good3 = "";
      this.privacyLevel = "onlyMe";


      //Open this form
      this.thisForm = formNumber;
      thisCard = document.getElementById("card-" + formNumber);
      editForm = document.getElementById("edit-form-" + formNumber);
      this.isFormVisible = true;
      thisCard.style.display = "none";
      editForm.style.display = "block";

    }else{
      console.log("true!!");
      let thisCard = document.getElementById("card-" + formNumber);
      let editForm = document.getElementById("edit-form-" + formNumber);
      this.isFormVisible = !this.isFormVisible;
      this.thisForm = formNumber;

      if(this.isFormVisible) {
        thisCard.style.display = "none";
      } else {
        thisCard.style.display = "block";
      }
    }
  }

  deleteDiary(diary){
    if(confirm("You want to delete this diary?")){
      this.userService.deleteDiary(this.userId, diary);
    }
  }

  updateDiary(thisDiary){
    this.userService.updateDiary(this.good1, this.good2, this.good3, this.privacyLevel, this.userId, thisDiary);
    //After create diary, clear the form
    this.good1 = "";
    this.good2 = "";
    this.good3 = "";
    this.privacyLevel = "onlyMe";

    //Close the form
    this.isFormVisible = false;
  }

  setPrivacyLevel(privacyLevel){
  this.privacyLevel = privacyLevel;
  }

}
