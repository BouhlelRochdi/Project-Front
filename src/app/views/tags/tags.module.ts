import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UpdateTagComponent } from './update-tag/update-tag.component';
import { SearchPipe } from './pipes/search.pipe';
import { DataTableModule } from 'angular2-datatable';


@NgModule({
  declarations: [
    TagsComponent,
    UpdateTagComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    DataTableModule,
    FormsModule
  ]
})
export class TagsModule { }
