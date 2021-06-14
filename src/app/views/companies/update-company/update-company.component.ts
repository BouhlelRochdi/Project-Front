import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { routes } from '../../../app-routing.module';
import { CompanyService } from '../../../services/company.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {
  updateCompany : FormGroup;
  id;
  company: [];

  constructor(private companyService : CompanyService,
    private toasterService : ToasterService,
    private router : Router,
    private activedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.updateCompany = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
    this.id = this.activedRouter.snapshot.params.id;
    const resultat = this.getCurrentCompany(this.id);
  }
  
  update(){
    this.companyService.updateCompany(this.id, this.updateCompany.value).subscribe(res =>{
      this.toasterService.pop('Great','You have update your profile');
      this.updateCompany.reset();
      this.router.navigateByUrl('/companies');     
    }, err => {
      console.log(err);
      
    })
  }
  
  getCurrentCompany(id){
    this.companyService.getCurrentCompany(id).subscribe(res => {
      this.updateCompany.patchValue(res);
    },
    err => {
      console.log(err);
    });
  }

  deleteCompany(){
    
  }

}
