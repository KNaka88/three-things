import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public file: File;
  public storageRef = firebase.storage().ref();
  public metadata = {
    contentType: 'image/jpeg'
  };
  public errorMessage: any;
  public downloadURL: any;

  constructor() { }

  ngOnInit() {
  }

  uploadImage(event) {
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
          this.file = fileList[0];
          let uploadTask = this.storageRef.child('images/' + this.file.name).put(this.file, this.metadata);

          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            function(snapshot) {
              let progress = (snapshot.bytesTransferred / snapshot.totyalBytes) * 100;
              console.log('upload is ' + progress + '% done');
              switch(snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                  console.log('upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING:
                  console.log('upload is running');
                  break;
              }
            },function(error) {
              console.log("Error:");
              console.log(error);
            }, function() {
              this.downloadURL = uploadTask.snapshot.downloadURL;
              console.log('downloadURL.......');
              console.log(this.downloadURL);
            });
      } //if closed
  }

  downloadImage(){
    console.log("download button clicked");
    this.storageRef.child('images/portland.jpg').getDownloadURL().then((url)=> {
      let img = (<HTMLImageElement>document.getElementById('myImg'));
      img.src = url;
      console.log(img.src);
    }).catch((error)=> {
      console.log(error);
    });
  }

  deleteImage(){
    let imageRef = this.storageRef.child('images/portland.jpg');
    imageRef.delete().then(()=>{
      console.log('delete success!');
    }).catch((error)=> {
      console.log(error);
    });
  }

}
