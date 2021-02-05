import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';

const routes: Routes = [
  {path: 'reactive', component: ReactiveFormComponent},
  {path:'**',pathMatch:'full' ,redirectTo:'reactive'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
