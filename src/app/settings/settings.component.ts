import { Component, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [UserService]
})
export class SettingsComponent {
  @Input() messageSender: string;
  public message: string;
  public searchKeyword: string;
  public isProfileSettingOpened: boolean = false;
  public isAccountSettingOpened: boolean = false;
  public isConfirmPasswordFormOpened: boolean = false;
  public isChangePasswordFormOpened: boolean = false;
  public isDeleteAccountFormOpened: boolean = false;

  constructor(
    private userService: UserService,
  ) { }

  closeAllForm(){
    this.isProfileSettingOpened = false;
    this.isAccountSettingOpened = false;
    this.isConfirmPasswordFormOpened = false;
    this.isDeleteAccountFormOpened = false;
    this.isConfirmPasswordFormOpened = false;
  }

  toggleAccountSetting(){
    this.isAccountSettingOpened = !this.isAccountSettingOpened;
    this.isProfileSettingOpened = false;
    this.message = "";
  }

  toggleConfirmPasswordForm(){
    this.isConfirmPasswordFormOpened = !this.isConfirmPasswordFormOpened;
    this.isDeleteAccountFormOpened = false;
  }

  toggleDeleteAccountForm(){
    this.isDeleteAccountFormOpened = !this.isDeleteAccountFormOpened;
    this.isConfirmPasswordFormOpened = false;
  }

  toggleProfileSetting(){
    this.isProfileSettingOpened = !this.isProfileSettingOpened;
    this.isAccountSettingOpened = false;
    this.message = "";
  }

  setMessage(updateMessage){
    this.message = updateMessage;
    //close all opened form
    this.closeAllForm();
  }
}
