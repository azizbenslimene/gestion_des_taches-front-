import { Comment } from "./comment";
import { Project } from "./project";

export enum StatusTache {
    A_Faire = 'A faire',
    En_Cours = 'En cours',
    Fait = 'Fait'
  }
  
  export class tache {
    tacheid!: any;
    tacheTitle!: string;
    descTache!: string;
    status!: StatusTache;
    dateStartTache!: Date;
    dateEndTache!: Date;
    cmnt!: Comment[];
    project!: Project;
  }
  