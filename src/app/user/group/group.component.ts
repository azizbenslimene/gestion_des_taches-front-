import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { Router } from '@angular/router';
import { Group } from '../../models/group';
import { User } from '../../models/user';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groups: Group[] = [];
  connectedUsers: User[] = [];
  selectedGroup: Group = { // Initialize with default values
    _id: '',
    groupName: '',
    description: '',
    owner: '',
    invitedUser: [],
    projectAs: ''
  };
  displayDialog: boolean = false;

  constructor(
    private service: ServiceService,
    private router: Router
  ) {}

  ngOnInit() {  
    this.getGroups();
    this.getConnectedUsers();
  }

  getGroups(): void {
    this.service.getallgroup().subscribe(res => {
      this.groups = res;
    }, err => {
      console.error('Erreur lors du chargement des groupes :', err);
    });
  }

  getConnectedUsers(): void {
    this.service.getConnectedUsers().subscribe(res => {
      this.connectedUsers = res;
    }, err => {
      console.error('Erreur lors du chargement des utilisateurs connectés :', err);
    });
  }

  openUpdateDialog(group: Group): void {
    this.selectedGroup = { ...group }; // Create a copy to avoid mutating the original
    this.displayDialog = true;
  }

  updateGroup(): void {
    if (this.selectedGroup._id) {
      this.service.updateGroup(this.selectedGroup._id, this.selectedGroup).subscribe(
        response => {
          console.log('Groupe mis à jour avec succès:', response);
          this.displayDialog = false; // Close dialog
          this.getGroups(); // Refresh groups after update
        },
        error => {
          console.error('Erreur lors de la mise à jour du groupe:', error);
        }
      );
    }
  }

  closeDialog(): void {
    this.displayDialog = false;
  }
}
