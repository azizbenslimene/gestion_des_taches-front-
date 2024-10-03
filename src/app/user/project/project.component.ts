import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit  {
  projects: Project [] = [];


  constructor(private router: Router,private service: ServiceService) {}

  ngOnInit(): void {
    this.getallproject();
  }
  
  getallproject(){
    this.service.getprojects().subscribe(res =>{this.projects=res;console.log(res) });
  }

}
