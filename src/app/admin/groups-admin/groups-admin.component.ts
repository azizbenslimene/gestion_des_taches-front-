import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-groups-admin',
  templateUrl: './groups-admin.component.html',
  styleUrls: ['./groups-admin.component.css']
})
export class GroupsAdminComponent implements OnInit {

  constructor(private router: Router, private service: ServiceService) {}

  groups: any[] = [];

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups(): void {
    this.service.getallgroup().subscribe({
      next: (data) => {
        this.groups = data;
        console.log(this.groups);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des groupes', err);
      }
    });
  }

  // Méthode pour supprimer un groupe
  deleteGroup(id: any): void {
    this.service.deleteGroup(id).subscribe({
      next: () => {
        // Remove the deleted group from the local groups array without refreshing the page
        this.groups = this.groups.filter(group => group._id !== id);
        console.log(`Groupe avec l'ID ${id} supprimé.`);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du groupe', err);
      }
    });
  }

}
