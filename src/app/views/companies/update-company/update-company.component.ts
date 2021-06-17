import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { routes } from '../../../app-routing.module';
import { CompanyService } from '../../../services/company.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IOption } from 'ng-select';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {
  updateCompany: FormGroup;
  id;
  company: [];
  enablePassword = false;
  enableRole = false;
  public roleCompany: Array<IOption> = [
    { label: 'Super Admin', value: 'superAdmin' },
    { label: 'Admin', value: 'admin' }
  ];

  constructor(private companyService: CompanyService,
    private toasterService: ToasterService,
    private router: Router,
    private activedRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.activedRouter.snapshot.params.id;
    const token = localStorage.getItem('token');
    const role = this.getRoleFromToken(token);
    const currentId = this.getCurrentIdFromToken(token);
    if (role !== null && role == 'superAdmin' && currentId != this.id) {
      this.enablePassword = true;
    }
    if (role !== null && role == 'admin'){
      this.enableRole = true;
    }
    this.updateCompany = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
      password: new FormControl({ value: '', disabled: this.enablePassword }, Validators.required),
      role: new FormControl({ value: 'admin', disabled: this.enableRole }, Validators.required)
    });
    const resultat = this.getCurrentCompany(this.id);
  }

  update() {
    this.companyService.updateCompany(this.id, this.updateCompany.value).subscribe(res => {
      this.toasterService.pop('Great', 'You have update your profile');
      this.updateCompany.reset();
      this.router.navigateByUrl('/companies');
    }, err => {
      console.log(err);
    })
  }

  getCurrentCompany(id) {
    this.companyService.getCurrentCompany(id).subscribe(res => {
      this.updateCompany.patchValue(res);
    },
      err => {
        console.log(err);
      });
  }

  getRoleFromToken(token: string) {
    try {
      const tokenInfo: any = jwt_decode(token);
      const role = tokenInfo.role;
      return role;
    }
    catch (Error) {
      return null;
    }
  }
  getCurrentIdFromToken(token: string) {
    try {
      const tokenInfo: any = jwt_decode(token);
      const currentId = tokenInfo.id;
      return currentId;
    } catch (error) {
      return null
    }
  }

}
