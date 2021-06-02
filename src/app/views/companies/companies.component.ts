import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  addCompany: FormGroup;
  submited = false;

  constructor() { }

  ngOnInit(): void {
    this.addCompany = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('admin', Validators.required),
      photo: new FormControl('')
    })
  }

  sendCompany() {
    this.submited = true;
    if (this.addCompany.invalid) {
      console.log(this.addCompany.value);
      ;
    }
    else {

    }

  }
}
