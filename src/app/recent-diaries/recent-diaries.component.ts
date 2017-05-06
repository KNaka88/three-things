import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { ImageCyclePipe } from '../image-cycle.pipe';
import { ReversePipe } from '../reverse.pipe';

@Component({
  selector: 'app-recent-diaries',
  templateUrl: './recent-diaries.component.html',
  styleUrls: ['./recent-diaries.component.css']
})
export class RecentDiariesComponent implements OnInit {
  public userId: any;
  public diaries: any;
  public thisForm: number = null;
  public isFormVisible: boolean = false;
  public good1: string;
  public good2: string;
  public good3: string;
  public privacyLevel: string = "onlyMe";

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.userId = urlParameters['id'];
      //getting diaries of recent
      this.diaries = this.userService.getRecentDiaries(this.userId);
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

}
