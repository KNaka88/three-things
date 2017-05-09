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

    let imgURL = '';

    //Check if user uploaded the image
    if(this.imgFile === undefined){
      //NO updated image
      imgURL = this.setDefaultImage();
      this.userService.makeDiary(this.good1, this.good2, this.good3, this.privacyLevel, this.userId, imgURL);
    }else {
      //User updated image
      //save to firebase storage
      this.uploadImage();
    }

    //After create diary, clear the form
    this.good1 = "";
    this.good2 = "";
    this.good3 = "";
    this.privacyLevel = "onlyMe";
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
      return this.imgManagementService.downloadImage(this.userId, imgFile);
    })
    .then((imgURL)=> {
      this.userService.makeDiary(this.good1, this.good2, this.good3, this.privacyLevel, this.userId, imgURL);
    }).catch((error)=> {
      console.log(error);
    });
  }

  setDefaultImage() {
      let imageNumber = Math.floor(Math.random() * 7);
      return '../../assets/card/card-image' + imageNumber + '.jpg';
  }
}
