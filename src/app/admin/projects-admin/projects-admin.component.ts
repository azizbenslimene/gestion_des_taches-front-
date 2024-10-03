import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-projects-admin',
  templateUrl: './projects-admin.component.html',
  styleUrls: ['./projects-admin.component.css']
})
export class ProjectsAdminComponent implements OnInit { 
  projects: any[] = [];

  constructor(private router: Router, private service: ServiceService) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.service.getprojects().subscribe({
      next: (data) => {
        this.projects = data;  // Assignation des projets récupérés à la variable
        console.log(this.projects);  // Pour vérifier dans la console
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des projets', err);
      }
    });
  }

  deleteProject(id: string): void {
    this.service.deleteProj(id).subscribe({
      next: () => {
        // Mise à jour de la liste des projets après suppression
        this.projects = this.projects.filter(project => project._id !== id);
        console.log(`Projet avec l'ID ${id} supprimé.`);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du projet', err);
      }
    });
  }
}
