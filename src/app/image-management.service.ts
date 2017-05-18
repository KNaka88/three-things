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

  uploadImage(file, imgFileName, userId) {

    let promise1 = new Promise((resolve) => {
        let uploadTask = this.storageRef.child('images/' + userId +  '/' + imgFileName).put(file, this.metadata);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          function(snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totyalBytes) * 100;

            switch(snapshot.state) {
              case firebase.storage.TaskState.PAUSED:
              break;
              case firebase.storage.TaskState.RUNNING:
              break;
            }
          },function(error) {
            console.log(error);
          }, function() {
              resolve(imgFileName);
          }
        );
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

  deleteImage(userId, imgFileName){
    let imageRef = this.storageRef.child('images/' + userId + '/' + imgFileName);

    imageRef.delete().then(()=>{
    }).catch((error)=> {
      console.log(error);
    });
  }

  deleteAllImage(userId, data){
    let allPromise = [];

    //create delete image promise array
    for (let key in data) {
      if (data.hasOwnProperty(key)) {

        if(data[key].imgFileName !== "none"){
          let imageRef = this.storageRef.child('images/' + userId + '/' + data[key].imgFileName);

          let promise = imageRef.delete();

          allPromise.push(promise);
        }
      }
    }
    return Promise.all(allPromise);
  }
}
