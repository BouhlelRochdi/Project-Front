import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UpdateTagComponent } from './update-tag/update-tag.component';


@NgModule({
  declarations: [
    TagsComponent,
    UpdateTagComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class TagsModule { }
