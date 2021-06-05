import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { passwordMatch } from '../classes/password-match';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPassword : FormGroup;
  submited = false;

  constructor(private companyservices : CompanyService, private router: Router,
    private toasterService: ToasterService, private activedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPassword = new FormGroup({
      token: new FormControl(this.activedRouter.snapshot.params.token),
      password: new FormControl('', Validators.required),
      passwordMatch : new FormControl('', Validators.required)
    },
    {validators: passwordMatch}
    );
  }

  updatePassword(){
    this.submited = true;
    if (this.resetPassword.invalid) {
      return;
    }
    else {
      this.companyservices.updatePassword(this.resetPassword.value).subscribe(res => {
        this.toasterService.pop('success', 'updated successfuly', 'you can loged in frome here');
        this.router.navigateByUrl('/login');
      }, err => {
        this.toasterService.pop('warning', 'updated Failed', err.error.message);
      })      
      }
  }

}
