import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ImageManagementService } from '../image-management.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Ng2ImgToolsService } from 'ng2-img-tools';

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
  public croppedImgFile:File;

  constructor(
    private userService: UserService,
    private imgManagementService: ImageManagementService,
    private route: ActivatedRoute,
    private ng2ImgToolsService: Ng2ImgToolsService,
  ) {}

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
    this.ng2ImgToolsService.resize([this.imgFile[0]], 330, 330).subscribe(result => {
            //Crop Image Success
            this.croppedImgFile = result;

            //Crete Unique File Name
            let imgFileName = Date.now() + this.croppedImgFile.name;

            //Call uploadImage() and get return as promise
            let promise1 = this.imgManagementService.uploadImage(this.croppedImgFile, imgFileName, this.userId);


            //If upload image was success, call downloadImage() and get imgURL as resolve value
            promise1.then( (imgFileName) => {
              return this.imgManagementService.downloadImage(imgFileName, this.userId);
            })
            .then( (imgURL) => {
              //if imgURL was obtained, create diary on database
              this.userService.makeDiary(this.good1, this.good2, this.good3, this.privacyLevel, this.userId, imgURL, imgFileName);
              //After create diary, clear the form
              this.good1 = "";
              this.good2 = "";
              this.good3 = "";
              this.privacyLevel = "onlyMe";
            })
            //if download image failed, show error status
            .catch((error)=> {
              console.log(error);
            });




        }, error => {
          //if crop image failed, show error
          console.log(error);
        });
  }

  setDefaultImage() {
      let imageNumber = Math.floor(Math.random() * 7);
      return '../../assets/card/card-image' + imageNumber + '.jpg';
  }
}
