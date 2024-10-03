import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tache } from '../../models/tache';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-addtache',
  templateUrl: './addtache.component.html',
  styleUrls: ['./addtache.component.css']
})
export class AddtacheComponent {
  tacheForm!: FormGroup;
  projets: any[] = []; // Liste des projets disponibles

  constructor(private fb: FormBuilder,private router: Router,private service: ServiceService) {}

  ngOnInit(): void {
    this.tacheForm = this.fb.group({
      tacheTitle: ['', Validators.required],
      descTache: ['', Validators.required],
      status: ['A faire', Validators.required], // Valeur par défaut "À faire"
      dateStartTache: ['', Validators.required],
      dateEndTache: ['', Validators.required],
      projectId: ['', Validators.required] // Champ pour l'ID du projet

    });
      // Charger les projets disponibles
      this.service.getprojects().subscribe(
        (projects) => {
          this.projets = projects;
        },
        (error) => {
          console.error('Erreur lors du chargement des projets', error);
        }
      );
    }
  

  onSubmit(): void {
    if (this.tacheForm.valid) {
      const newTache = this.tacheForm.value;
      this.service.addtache(newTache).subscribe(
        response => {
          console.log('Tâche ajoutée avec succès', response);
          this.router.navigate(['/user/gettaches']); // Rediriger vers une page de confirmation ou la liste des tâches
        },
        error => {
          console.error('Erreur lors de l\'ajout de la tâche', error);
        }
      );
    }
  }
}
