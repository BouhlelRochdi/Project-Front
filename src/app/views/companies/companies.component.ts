import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CompanyService } from '../../services/company.service';
import { IOption } from 'ng-select';
import { SweetAlertService } from '../../services/sweet-alert.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  dtOptions: any = {};
  addCompany: FormGroup;
  submited = false;
  companys: [];
  photoUploaded: File = null;
  photoUrl: any;
  token = localStorage.getItem('token');
  currentId: any;
  currentRole: any;
  @ViewChild('companyModal') companyModal: ModalDirective;
  filterQuery: string = null;
  public roleCompany: Array<IOption> = [
    { label: 'Super Admin', value: 'superAdmin' },
    { label: 'Admin', value: 'admin' }
  ];

  constructor(private toaster: ToasterService,
    private companyService: CompanyService,
    private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.currentId = this.getCurrentIdFromToken(token);
    this.currentRole = this.getRoleFromToken(token);
    this.addCompany = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('admin', Validators.required)
    });
    this.getAllCompanys();
  }


  onFileSelect(event) {
    if (event.target.files.length == 0) {
      this.toaster.pop('error', 'Photo Errors', 'Please select an image file')
      return;
    }
    else {
      this.photoUploaded = (event.target as HTMLInputElement).files[0];
      const allowedExtensionFile = ['image/jpg', 'image/jpeg', 'image/png'];
      if (!allowedExtensionFile.includes(this.photoUploaded.type)) {
        this.toaster.pop('error', 'Photo Errors', 'Only those extension are acceptable! [jpg, jpeg, png]')
        return;
      }
      else {
        // this part is to review the photo in the form
        const readFile = new FileReader();
        readFile.readAsDataURL(this.photoUploaded);
        readFile.onload = (event) => {
          this.photoUrl = readFile.result;
        }
      }
    }
  }

  sendCompany() {
    this.submited = true;
    if (this.addCompany.invalid || this.photoUploaded == null) {
      this.toaster.pop('error', 'invalid Form', 'Please complete all informations');
      return;
    }
    else {
      const formData = new FormData();
      const data = this.addCompany.value;
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      if (this.photoUploaded !== null) {
        formData.append('photo', this.photoUploaded, this.photoUploaded.name);
      }

      this.companyService.addCompany(formData).subscribe(res => {
        this.toaster.pop('success', 'Company has been Add');
        this.companyModal.hide();
      }, err => {
        this.toaster.pop('error', err.error.message);
      })
    }
  }

  getAllCompanys() {
    this.companyService.getAllCompanys().subscribe(res => {
      this.companys = res;
    },
      err => { 
        this.toaster.pop('error', 'Something goes wrong', err.error.message)
       }
    );
  }

  deletecompany(id) {
    this.sweetAlertService.confirm().then((res) => {
      if (res.isConfirmed) {
        this.companyService.deleteOne(id).subscribe(res => {
          this.toaster.pop('success', 'Deleted with Success');
          this.getAllCompanys();
        },
          err => {
            this.toaster.pop('error', err.error.message);
          });
      }
    });

  }

  openLg() {
    this.companyModal.show();
    // this.modalService.open(content, { size: 'lg', centered: true, scrollable: true });
  }

  getCurrentIdFromToken(token: string){
    try{
      const tokenInfo : any= jwt_decode(token);
      const currentId = tokenInfo.id;
        return currentId;
    }
    catch(Error){
        return null;
    }
  }

  getRoleFromToken (token: string){
    try{
      const tokenInfo : any= jwt_decode(token);
      const currentRole = tokenInfo.role;
        return currentRole;
    }
    catch(Error){
        return null;
    }
  }
}
