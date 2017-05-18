import { Component, Output, EventEmitter} from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent{
  @Output() messageSender = new EventEmitter();
  public newPassword: string = '';
  public confirmPassword: string = '';
  public isPasswordMatch: boolean;
  public isPasswordLength: boolean;
  public isChangePasswordFormOpened: boolean = false;
  public isAccountSettingOpened: boolean = false;


  constructor(
    private userService: UserService,
  ) { }


  ngDoCheck(){
    //if password length is more than 6, change color to green
    if(this.newPassword.length >= 6){
      this.isPasswordLength = true;
    }else{
      this.isPasswordLength = false;
    }

    //if password and confirm password matches, change color to green
    if (this.newPassword === this.confirmPassword && this.newPassword.length >= 6){
      this.isPasswordMatch = true;
    }else{
      this.isPasswordMatch = false;
    }
  }


  confirm(email, password){
    //TODO: add credential -> then run update function
    let promise = new Promise((resolve) => {
      let credential = this.userService.getCredentials(email, password);
      resolve(credential);
    });


    promise.then( (credential) => {
      this.userService.reauthenticate(credential).then( ()=> {
        //user reauthenticated
        this.isChangePasswordFormOpened = true;
      }), function(error){
        //error
        console.log(error);
      }
    });
  }


  updatePassword(){
    //check if form is typed correct
    let verified = (this.isPasswordMatch && this.isPasswordLength);

    if(verified){
      let update = this.userService.updatePassword(this.newPassword);
      update.then(()=>{
        //success
        //clear the form
        this.newPassword = '';
        this.confirmPassword = '';

        //show the result message
        this.messageSender.emit("Updated!");

      }), function(error) {
        //show the result message
        this.messageSender.emit("Error");
      };
    }
  }

}
