import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TagsComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    ReactiveFormsModule
  ]
})
export class TagsModule { }
