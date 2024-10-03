import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { Group } from '../../models/group';
import { tache } from 'src/app/models/tache';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {  

  
  groups: any = [];
  connectedUsers!: any[];
  taches: tache[] = [];
  grp: Group = new Group();
  selectedUsers: User[] = []; 
  displayDialog: boolean = false;
  newUserEmail: any;
  groupCreationPageUrl: string = 'user/createGrp'; // Adjust based on your route

 


  @Output() groupCreated = new EventEmitter<Group>();

  constructor(private service: ServiceService,private router:Router,    private route: ActivatedRoute
  ) {}

  ngOnInit() {  
    console.log(this.groups);
       this.grp = new Group(); 


    this.service.getConnectedUsers().subscribe(res => {
      this.connectedUsers = res;
      console.log(this.connectedUsers,"aaa");
    });

 
    this.route.queryParams.subscribe(params => {
      const email = params['email'];

      if (email) {
        // Call backend to check if the user exists
        this.service.checkUserExists(email).subscribe(response => {
          if (response.exists) {
            // Redirect to create group page if the user exists
            this.router.navigate(['/user/createGrp']);
          } else {
            // Redirect to login page if the user doesn't exist
            this.router.navigate(['/login']);
          }
        }, error => {
          console.error('Error checking user existence:', error);
          // Optionally, handle errors (e.g., show a message to the user)
        });
      }
    });
  }
    
  

  createGroup(): void {
    this.grp.invitedUser = this.selectedUsers;  // Assignez les utilisateurs sélectionnés au groupe
    this.service.addgroup(this.grp).subscribe(res => {
      console.log('Groupe créé avec succès :', res);
      this.groupCreated.emit(this.grp);  
      this.grp = new Group();  
      this.selectedUsers = [];  // Réinitialisez la liste des utilisateurs sélectionnés
      this.router.navigate(['/user/getallgroups']);
    }, err => {
      console.error('Erreur lors de la création du groupe :', err);
    });
  }
  showAddUserDialog() {
    this.displayDialog = true;
  }

  inviteUser() {
    const subject = 'Invitation à rejoindre le groupe';
    // Ensure this link corresponds to your application route
    const link = `user/createGrp`; // Replace with the actual route if different

    const body = {
      to: this.newUserEmail,
      subject: subject,
      link: link
    };

    this.service.Senndinvi(body).subscribe(
      response => {
        console.log('Invitation email sent successfully:', response);
        this.displayDialog = false;
        this.newUserEmail = ''; // Clear the input
      },
      error => {
        console.error('Error sending invitation email:', error);
      }
    );
  }
}
