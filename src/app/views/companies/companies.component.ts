import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CompanyService } from '../../services/company.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  addCompany: FormGroup;
  submited = false;
  companys: [];
  @ViewChild('companyModal') companyModal: ModalDirective;

  constructor(private toaster: ToasterService,
    private companyService: CompanyService) { }

  ngOnInit(): void {
    this.addCompany = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('admin', Validators.required),
      photo: new FormControl('', Validators.required)
    });
    this.getAllCompanys();
  }

  sendCompany() {
    this.submited = true;
    if (this.addCompany.invalid) {
      console.log(this.addCompany.value);
    }
    else {
      this.companyService.addCompany(this.addCompany.value).subscribe(res => {
        this.toaster.pop('success', 'Company has been Add');
        this.companyModal.hide();
      }, err => {
        console.log(err);
      })
    }
  }

  getAllCompanys() {
    this.companyService.getAllCompanys().subscribe(res => {
      this.companys = res;
      this.toaster.pop('Got It','Here we go!')
    },
      err => { console.log(err) }
    );
  }

  deletecompany(id) {
    Swal.fire({
      title: 'Are you sure want to remove it?',
      text: 'You will not be able to rstore this field!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Do it!',
      cancelButtonText: 'No, keep it'
    }).then((res)=>{
      if(res.isConfirmed){
        this.companyService.deleteOne(id).subscribe(res => {
          this.toaster.pop('success', res);
          this.getAllCompanys();
        },
        err => {
          console.log(err); 
        });
      }
      else if (res.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your have canceled this operation', 'error')
      }
      
    });
    
  }

  openLg() {
    this.companyModal.show();
    // this.modalService.open(content, { size: 'lg', centered: true, scrollable: true });
  }
}
