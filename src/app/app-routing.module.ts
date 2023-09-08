import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { FormListComponent } from './form-list/form-list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: 'add-form', component : AddFormComponent},
  { path: 'add-form/edit/:index', component: AddFormComponent },
  {path: '', component: FormListComponent},
  {path : 'profile/:index', component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
