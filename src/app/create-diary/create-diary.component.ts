import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ImageManagementService } from '../image-management.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-create-diary',
  templateUrl: './create-diary.component.html',
  styleUrls: ['./create-diary.component.css']
})
export class CreateDiaryComponent implements OnInit {
  public userId: any;
  public userName: any;
  public userEmail: any;
  public user: FirebaseObjectObservable<any>;
  public today: number;
  public errorMessage: boolean = false;

  public good1: string;
  public good2: string;
  public good3: string;
  public privacyLevel: string = "onlyMe";
  public url:any;
  public imgFile:FileList;

  constructor(
    private userService: UserService,
    private imgManagementService: ImageManagementService,
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

  makeDiary(){
    //check if user typed all the form
    if(this.good1 && this.good2 && this.good3){

      //hide the error message
      this.errorMessage = false;

      //initialize imgURL
      let imgURL = '';

      //Check if user uploaded the image
      if(this.imgFile === undefined){
        //NO updated image
        imgURL = this.setDefaultImage();
        let imgFileName = 'none';
        this.userService.makeDiary(this.good1, this.good2, this.good3, this.privacyLevel, this.userId, imgURL, imgFileName);
        //After create diary, clear the form
        this.good1 = "";
        this.good2 = "";
        this.good3 = "";
        this.privacyLevel = "onlyMe";
      }else {
        //User updated image
        //save to firebase storage
        this.uploadImage();
      }



    }else {
      //show the error message
      this.errorMessage = true;
    }
  }

  setPrivacyLevel(privacyLevel){
    this.privacyLevel = privacyLevel;
  }
  setUploadImage(event){
      this.imgFile = event.target.files;
  }


  uploadImage() {
    let promise1 = new Promise((resolve) => {
      //save to firebase
      this.imgManagementService.uploadImage(this.imgFile, this.userId);
      resolve(this.imgFile[0].name);
    });

    promise1.then( (imgFile)=> {
      //SUCCESS: get the image url
      console.log('imgFile~~');
      console.log(imgFile);
      return this.imgManagementService.downloadImage(this.userId, imgFile);
    })
    .then((imgURL)=> {
      let imgFileName = this.imgFile[0].name;
      console.log("good1" + this.good1);
      this.userService.makeDiary(this.good1, this.good2, this.good3, this.privacyLevel, this.userId, imgURL, imgFileName);
      //After create diary, clear the form
      this.good1 = "";
      this.good2 = "";
      this.good3 = "";
      this.privacyLevel = "onlyMe";
    }).catch((error)=> {
      console.log(error);
    });
  }

  setDefaultImage() {
      let imageNumber = Math.floor(Math.random() * 7);
      return '../../assets/card/card-image' + imageNumber + '.jpg';
  }
}
