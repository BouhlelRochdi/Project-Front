import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword : FormGroup;
  submited = false;

  constructor(private companyService: CompanyService, private toasterService: ToasterService) { }
  ngOnInit(): void {
    this.forgotPassword = new FormGroup({
      email : new FormControl('', Validators.required)
    })
  }

  resetPassword(){
    this.submited = true;
    if (this.forgotPassword.invalid){
      return;
    }else
    {
      this.companyService.forgotPassword(this.forgotPassword.value).subscribe(res => {
        console.log(res);
        this.toasterService.pop('success', 'Already sent .. check your Email');
      }, err => {
        console.log(err.error.message);
      });;
    }
  }

}
