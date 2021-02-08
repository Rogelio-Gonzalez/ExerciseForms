import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';

const routes: Routes = [
  {path: 'table', component: UserTableComponent},
  {path: 'reactive', component: ReactiveFormComponent},
  {path:'**',pathMatch:'full' ,redirectTo:'table'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
