import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { AdminRoutingModule } from './admin-routing.module';
import { FormsComponent } from './components/forms/forms.component';
import { ListComponent } from './components/list/list.component';
import { AdminPageComponent } from './Pages/admin-page/admin-page.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    FormsComponent,
    ListComponent,
    AdminPageComponent,
    TabsComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
