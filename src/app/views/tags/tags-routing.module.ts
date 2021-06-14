import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsComponent } from './tags.component';
import { UpdateTagComponent } from './update-tag/update-tag.component';

const routes: Routes = [
  { 
    path: '', component: TagsComponent ,
    data: {
      title: 'tags'
    }
  },
  {
    path: 'updateTag/:id',
    component: UpdateTagComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
