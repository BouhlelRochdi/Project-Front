import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { TagsService } from '../../services/tags.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tagsForm: FormGroup;
  submited = false;
  tags: [];
  @ViewChild('tagsModal') tagsModal: ModalDirective;

  constructor(private tagsService : TagsService,
    private toaster: ToasterService,
    private sweetAlertService : SweetAlertService) { }

  ngOnInit(): void {
    this.tagsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.getAllTags();
  }

  saveTag(){
    this.submited= true;
    if(this.tagsForm.invalid){
      return;
    }
    else{
      this.tagsService.saveTags(this.tagsForm.value).subscribe(
        res =>{
          this.toaster.pop('success', 'Tags has been Add', res);
          console.log(res._id);
          this.getAllTags();
          this.tagsModal.hide();          
        },
         err => {
           console.log(err)
          });
    } 
  }

  open() {
    this.tagsModal.show();
}

deleteTag(id){
  this.sweetAlertService.confirm().then((res)=>{
    if(res.isConfirmed){
      this.tagsService.deleteOne(id).subscribe(res => {
        this.toaster.pop('success', res);
        this.getAllTags();
      },
      err => {
        console.log(err); 
      });
    }
  });
}

getAllTags(){
  this.tagsService.getAlltags().subscribe(res => {
    this.tags = res;
  },
    err => { console.log(err) }
  );
}

}
