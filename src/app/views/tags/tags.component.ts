import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tagsForm: FormGroup;
  submited = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.tagsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }

  saveTag(){
    this.submited= true;
    if(this.tagsForm.invalid){
      return;
    }
    else{
      console.log(this.tagsForm.value);
    }
    
  }

}
