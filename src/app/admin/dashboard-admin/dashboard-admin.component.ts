import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit  {
  constructor(private router : Router, private service : ServiceService){}
  

  users: User []= [];  // Liste pour stocker les utilisateurs
  selectedRole: string = '';

  ngOnInit() {
    this.getUsers(); // Récupère tous les utilisateurs au démarrage
  }

  // Méthode pour récupérer les utilisateurs filtrés par rôle
  getUsers() {
    this.service.getUsers(this.selectedRole).subscribe({
      next: (res) => {
        this.users = res; // Stocke les utilisateurs récupérés
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
      }
    });
  }
  changeRole(userId: string, newRole: string) {
    this.service.updateUserRole(userId, newRole).subscribe({
      next: () => {
        this.getUsers(); // Recharger les utilisateurs après mise à jour
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du rôle:', err);
      }
    });
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(userId: string) {
    this.service.deleteUser(userId).subscribe({
      next: () => {
        this.getUsers(); // Recharger les utilisateurs après suppression
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', err);
      }
    });
  }

}
