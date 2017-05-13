import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {
  @Output() messageSender = new EventEmitter();
  public newPassword: string = '';
  public confirmPassword: string = '';
  public isPasswordMatch: boolean;
  public isPasswordLength: boolean;
  public isDeleteAccountFormOpened: boolean = false;
  public isAccountSettingOpened: boolean = false;


  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }


  confirm(email, password){
    //TODO: add credential -> then run update function
    let promise = new Promise((resolve) => {
      let credential = this.userService.getCredentials(email, password);
      resolve(credential);
    });


    promise.then( (credential) => {
      this.userService.reauthenticate(credential).then( ()=> {
        if(confirm("Your account will be permanently deleted. Are you sure you want to delete the account?")){
            this.userService.deleteAccount();
        }
      }), function(error){
        //error
        console.log(error);
      }
    });
  }

}
