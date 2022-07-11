import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { FormsComponent } from './components/forms/forms.component';
import { AdminPageComponent } from './Pages/admin-page/admin-page.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
  },
  {
    path: 'list', component: AdminPageComponent,
  },
  {
    path: 'form', component: FormsComponent,
  },
  {
    path: 'form/id', component: FormsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
