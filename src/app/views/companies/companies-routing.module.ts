import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';

const routes: Routes = [{ path: '', component: CompaniesComponent,
data: {
  title: 'Companies'
} },
{
  path : 'updateCompany/:id',
  component: UpdateCompanyComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
