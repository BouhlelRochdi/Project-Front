import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  addCompany: FormGroup;
  submited = false;

  constructor(private companyService : CompanyService) { }
  
  ngOnInit(): void {
    this.addCompany = new FormGroup({
      companyName: new FormControl('', Validators.required),
      companyDescription: new FormControl('', Validators.required),
      companyEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required)
    })
  }

  validateCompany() {
    this.submited = true;
    if (this.addCompany.invalid) {
      return;
    }
    else {    
      this.companyService.addCompany(this.addCompany.value);    
    }
    
  }

}
