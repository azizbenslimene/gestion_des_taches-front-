import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  constructor(private router : Router, private service : ServiceService){}
  adminData = {
    userName: '',
    userLastName: '',
    emailUser: '',
    mtpUser: '',
    role: 'admin'  // On spécifie que c'est un admin
  };

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
