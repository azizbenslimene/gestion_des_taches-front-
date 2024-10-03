import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { FormsModule } from '@angular/forms';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ProjectsAdminComponent } from './projects-admin/projects-admin.component';
import { GroupsAdminComponent } from './groups-admin/groups-admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    RegisterAdminComponent,
    DashboardAdminComponent,
    AddAdminComponent,
    ProjectsAdminComponent,
    GroupsAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
  ]
})
export class AdminModule { }
