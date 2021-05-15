import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private toasterService: ToasterService, private companyService: CompanyService) { }
  loginForm : FormGroup;
  submited = false;

  ngOnInit(): void {
    this.showSuccess();
    this.loginForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', Validators.required)
    })
  }

  showSuccess() {
    this.toasterService.pop('success', 'Success Toaster', 'This is toaster description');
  }

  verif(){
    this.submited = true;
    if(this.loginForm.invalid){
      return;
    }
    else{
      this.companyService.login(this.loginForm.value);
      
    }
  }

 }
