import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddgroupComponent } from './addgroup/addgroup.component';
import { GroupComponent } from './group/group.component';
import { TacheComponent } from './tache/tache.component';
import { AddtacheComponent } from './addtache/addtache.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { ProfileComponent } from './profile/profile.componet';
import { ProjectComponent } from './project/project.component';


const routes: Routes = [
  {
    path:'', component:UserComponent, children:[
     { path:'dashboard',component:DashboardComponent},
     { path:'createGrp',component:AddgroupComponent},
     {path:'getallgroups', component:GroupComponent},
     {path:'gettaches', component:TacheComponent},  
     {path:'createTache', component:AddtacheComponent},
     {path:'createGrp', component:AddgroupComponent},
     {path:'addProject',component:AddprojectComponent},
     {path:'getAllProj', component:ProjectComponent},
     {path:'profile', component:ProfileComponent},
     { path: 'createGrp/email=:email', component: AddgroupComponent },



   

    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
