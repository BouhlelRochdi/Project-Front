import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { TagsService } from '../../../services/tags.service';

@Component({
  selector: 'app-update-tag',
  templateUrl: './update-tag.component.html',
  styleUrls: ['./update-tag.component.css']
})
export class UpdateTagComponent implements OnInit {
  updateTagsForm: FormGroup;
  submited = false;
  id;

  constructor(private tagsService : TagsService,
    private toaster: ToasterService,
    private router : Router,
    private activedRouter:ActivatedRoute) { }
    

  ngOnInit(): void {
    this.updateTagsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.id = this.activedRouter.snapshot.params.id;
    const resultat = this.getCurrentTag();
  }

  updateTag(){
    this.tagsService.updateTag(this.updateTagsForm.value, this.id).subscribe(res => {
      this.toaster.pop('success', 'updated with Sucess', 'you will be redirect to tags`s page');
      this.updateTagsForm.reset();
      this.router.navigateByUrl('/tags');
    }, 
      err =>{console.log(err);
    })
  }

  getCurrentTag(){
    this.tagsService.getCurrentTag(this.id).subscribe(res => {
      this.updateTagsForm.patchValue(res);
    },
    err => {
      console.log(err);
    });
  }
}
