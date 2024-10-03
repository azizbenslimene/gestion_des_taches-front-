import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentComponent } from './user/comment/comment.component';
import { TacheComponent } from './user/tache/tache.component';
import { SprintComponent } from './user/sprint/sprint.component';
import { GroupComponent } from './user/group/group.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SessionManagmentService } from './service/session-managment.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddgroupComponent } from './user/addgroup/addgroup.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { AddtacheComponent } from './user/addtache/addtache.component'; // Ajoutez ceci
import { DragDropModule } from 'primeng/dragdrop';
import { DialogModule } from 'primeng/dialog';
import { VerifyIpComponent } from './verify-ip/verify-ip.component';






@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    RegisterComponent,
    VerifyIpComponent,
    

    
    
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    DragDropModule,
    DialogModule,
    
    
    Ng2SearchPipeModule // Ensure this module is imported
  ],
  providers: [
    MessageService,
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    JwtHelperService, // Ensure these services are correctly imported and used
    SessionManagmentService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
  