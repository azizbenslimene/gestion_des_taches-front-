import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { GroupsAdminComponent } from './groups-admin/groups-admin.component';
import { ProjectsAdminComponent } from './projects-admin/projects-admin.component';

const routes: Routes = [
  {path:'registeradmin' ,component:RegisterAdminComponent},
  {path:'dashboardadmin',component:DashboardAdminComponent},
  {path:'addadmin',component:AddAdminComponent},
  {path:'groupsadmin',component:GroupsAdminComponent},
  {path:'projectadmin',component:ProjectsAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
