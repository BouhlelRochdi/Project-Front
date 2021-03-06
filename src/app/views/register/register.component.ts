import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { IOption } from 'ng-select';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  addCompany: FormGroup;
  submited = false;
  public roleCompany: Array<IOption> = [
    {label: 'Super Admin', value: 'superAdmin'},
    {label: 'Admin', value: 'admin'}
  ];

  constructor(private companyService: CompanyService, private router: Router,
    private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.addCompany = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('admin', Validators.required)
    })
  }

  validateCompany() {
    this.submited = true;
    if (this.addCompany.invalid) {
      return;
    }
    else {
      this.companyService.register(this.addCompany.value).subscribe(res => {
        this.toasterService.pop('success', 'Registred successfuly', 'you can loged in frome here');
        this.router.navigateByUrl('/login');
      }, err => {
        this.toasterService.pop('warning', 'Registred Failed', err.error.message);
      })

    }

  }

}
