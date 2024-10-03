import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddgroupComponent } from './user/addgroup/addgroup.component';
import { GroupComponent } from './user/group/group.component';
import { TacheComponent } from './user/tache/tache.component';
import { AddtacheComponent } from './user/addtache/addtache.component';
import { VerifyIpComponent } from './verify-ip/verify-ip.component';

const routes: Routes = [

  {path: 'user', loadChildren:()=> import('./user/user.module').then(m=>m.UserModule)},

  {path: 'admin', loadChildren:()=> import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  { path: 'verify-ip/:userId/:ip', component: VerifyIpComponent },



 


  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
