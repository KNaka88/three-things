import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class ImageManagementService {

  public file: File;
  public storageRef = firebase.storage().ref();
  public errorMessage: any;
  public downloadURL: any;
  public metadata = {
    contentType: 'image/jpeg'
  };

  constructor() { }

  uploadImage(fileList, userId) {



    // TODO: Compress Image File




    if(fileList.length > 0) {
        this.file = fileList[0];
        let uploadTask = this.storageRef.child('images/' + userId +  '/' + this.file.name).put(this.file, this.metadata);

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
          });
    } //if closed
  }

  downloadImage(userId, imgFile){
    return this.storageRef.child('images/' + userId + '/' + imgFile).getDownloadURL();
    // this.storageRef.child('images/' + userId + '/' + imgFile).getDownloadURL().then((url)=> {
    //   console.log('result');
    //   console.log(url);
    //   // let img = (<HTMLImageElement>document.getElementById('myImg'));
    //   // img.src = url;
    //   return url;
    // }).catch((error)=> {
    //   console.log(error);
    //   return "error";
    // });
  }

  deleteImage(){
    let imageRef = this.storageRef.child('images/portland.jpg');
    imageRef.delete().then(()=>{
      console.log('delete success!');
    }).catch((error)=> {
      console.log(error);
    });
  }

  deleteAllImage(userId, data){
    let allImageURL = [];

    //create imageURL array
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        allImageURL.push(data[key].imgURL);
      }
    }

    let imageRef = this.storageRef.child('images/' + userId);
    imageRef.delete().then(()=>{
      console.log('delete success!');
    }).catch((error)=> {
      console.log(error);
    });
  }

}
