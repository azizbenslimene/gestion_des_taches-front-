import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent {
  constructor(private router : Router, private service : ServiceService){}
  adminData = {
    userName: '',
    userLastName: '',
    emailUser: '',
    mtpUser: '',
    role: 'admin'  // On spécifie que c'est un admin
  };


  user : User = new User();

  registerAdmin() {
    this.user.role = 'admin';
    this.service.register(this.user).subscribe(res =>{console.table(res);});
 
    this.router.navigate(['/login'])
  }

  
  addAdmin() {
    this.service.register(this.adminData).subscribe({
      next: (res) => {
        console.log('Nouvel admin ajouté', res);
        this.router.navigate(['/admin/list']);  // Rediriger ou afficher un message de succès
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de l\'admin', err);
      }
    });
  }
}
