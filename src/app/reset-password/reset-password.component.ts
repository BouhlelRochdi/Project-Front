import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../classes/password-match';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPassword : FormGroup;
  submited = false;

  constructor() { }

  ngOnInit(): void {
    this.resetPassword = new FormGroup({
      password: new FormControl('', Validators.required),
      passwordMatch : new FormControl('', Validators.required)
    },
    {validators: passwordMatch}
    )
  }

  updatePassword(){
    this.submited = true;
    if (this.resetPassword.invalid) {
      return;
    }
    else {
      console.log(this.resetPassword.value);
      
      }
  }

}
