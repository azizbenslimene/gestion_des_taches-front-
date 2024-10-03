import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  newProject: Project = {
    
    projectName: '',
    dateStartProj: '',
    dateEndProj: '',
    groupId: ''
  };  // Modèle de projet

  groups: any[] = [];  // Propriété pour stocker les groupes
  email: string | null = null;


  constructor(private service: ServiceService,    private route: ActivatedRoute ,    private router: Router,

  ) {}

  ngOnInit() {
    // Récupérer les groupes disponibles au démarrage du composant
    this.service.getallgroup().subscribe((data) => {
      this.groups = data;
    });

    
  }
  
  

  addProject(): void {
    this.service.addproject(this.newProject).subscribe(res => {
      console.log(res);
      this.router.navigate(['/user/getAllProj']);    });
  }

}
