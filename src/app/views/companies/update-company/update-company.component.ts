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
  submited = false;
  company: [];
  disablePassword = false;
  disabledRole = false;
  photoUploaded: File = null;
  photoUrl: any;
  public roleCompany: Array<IOption> = [
    { label: 'Super Admin', value: 'superAdmin' },
    { label: 'Admin', value: 'admin' }
  ];

  constructor(private companyService: CompanyService,
    private toasterService: ToasterService,
    private router: Router,
    private activedRouter: ActivatedRoute,
    private toaster : ToasterService) { }

  ngOnInit(): void {

    this.id = this.activedRouter.snapshot.params.id; //get Id Company sent in URL
    const token = localStorage.getItem('token');
    const role = this.getRoleFromToken(token);
    const currentId = this.getCurrentIdFromToken(token);
    if (role !== null && role == 'superAdmin' && currentId != this.id) {
      this.disablePassword = true;
    }
    if (role !== null && role == 'admin'){
      this.disabledRole = true;
    }
    this.updateCompany = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
      password: new FormControl({ value: '', disabled: this.disablePassword }, Validators.required),
      role: new FormControl({ value: 'admin', disabled: this.disabledRole }, Validators.required)

    });
    const resultat = this.getCurrentCompany(this.id);
  }

  onFileSelect(event) {
    if (event.target.files.length == 0) {
      this.toasterService.pop('error', 'Photo Errors', 'Please select an image file')
      return;
    }
    else {
      this.photoUploaded = (event.target as HTMLInputElement).files[0];
      const allowedExtensionFile = ['image/jpg', 'image/jpeg', 'image/png'];
      if (!allowedExtensionFile.includes(this.photoUploaded.type)) {
        this.toasterService.pop('error', 'Photo Errors', 'Only those extension are acceptable! [jpg, jpeg, png]')
        return;
      }
      else {
        const readFile = new FileReader();
        readFile.readAsDataURL(this.photoUploaded);
        readFile.onload = (event) => {
          this.photoUrl = readFile.result;
        }
      }
    }
  }

  update() {
    this.submited = true
    if(this.updateCompany.invalid){
      console.log(this.updateCompany.value);
      
      return;
    }
    else{
      const formData = new FormData();
        const data = this.updateCompany.value;
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        });
        if (this.photoUploaded !== null) {
          formData.append('photo', this.photoUploaded, this.photoUploaded.name);
        }
      this.companyService.updateCompany(this.id, formData).subscribe(res => {
      this.toasterService.pop('success', 'You have update your profile');
      this.updateCompany.reset();
      this.router.navigateByUrl('/companies');
      this.submited = false;
    }, err => {
      this.toaster.pop('error', err.error.message);
    })}
  }

  getCurrentCompany(id) {
    this.companyService.getCurrentCompany(id).subscribe(res => {
      this.updateCompany.patchValue(res);      
    },
      err => {
        this.toaster.pop('error', err.error.message);
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
