import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { routes } from '../../app-routing.module';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private toasterService: ToasterService, private companyService: CompanyService, private router: Router) { }
  loginForm: FormGroup;
  submited = false;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }


  verif() {
    this.submited = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.companyService.login(this.loginForm.value).subscribe(res => {
        this.toasterService.pop('success', 'Logged in successfuly');
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/dashboard');
      }, err => {
        this.toasterService.pop('warning', 'Login Failed', err.error.message);
      });

    }
  }

}
