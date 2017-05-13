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


    let promise1 = new Promise((resolve) => {

      if(fileList.length > 0) {

        this.file = fileList[0];
        let imgFileName = this.file.name;

        let uploadTask = this.storageRef.child('images/' + userId +  '/' + imgFileName).put(this.file, this.metadata);

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
              resolve(imgFileName);
          }
        );
      }
    });

    return promise1;


  }

  downloadImage(imgFileName, userId ){

    let promise2 = new Promise( (resolve) => {
      let imgURL = this.storageRef.child('images/' + userId + '/' + imgFileName).getDownloadURL();
      resolve(imgURL);
    });

    return promise2;
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

    let allPromise = [];

    //create delete image promise array
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let imageRef = this.storageRef.child('images/' + userId + '/' + data[key].imgFileName);

        let promise = imageRef.delete();

        allPromise.push(promise);
      }
    }
    return Promise.all(allPromise);
  }
}
