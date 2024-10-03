import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MegaMenuModule } from 'primeng/megamenu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect'; // Ajoutez ceci
import { DragDropModule } from 'primeng/dragdrop';
import { TacheComponent } from './tache/tache.component';
import { AddgroupComponent } from './addgroup/addgroup.component';
import { AddtacheComponent } from './addtache/addtache.component';
import { SprintComponent } from './sprint/sprint.component';
import { CommentComponent } from './comment/comment.component';
import { GroupComponent } from './group/group.component';
import { EditorModule } from 'primeng/editor';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { AddprojectComponent } from './addproject/addproject.component';
import { ProjectComponent } from './project/project.component';
import { ProfileComponent } from './profile/profile.componet';



@NgModule({
  declarations: [
    UserComponent,
    
    DashboardComponent,
    TacheComponent,
    AddgroupComponent,
    AddtacheComponent,
    CommentComponent,
    SprintComponent,
    GroupComponent,
    AddprojectComponent,
    ProjectComponent,
ProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ToastModule,
    MegaMenuModule,
    AvatarModule,
    BadgeModule,
    AvatarGroupModule,
    DialogModule,
    MultiSelectModule ,
    DragDropModule,
    EditorModule,
    NzCommentModule,
    ReactiveFormsModule // Importé ici
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
