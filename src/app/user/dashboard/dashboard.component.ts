import { Component, OnInit, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { Group } from 'src/app/models/group';
import { tache } from 'src/app/models/tache';
import { ServiceService } from 'src/app/service/service.service';
import { SessionManagmentService } from 'src/app/service/session-managment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items!: MegaMenuItem[];
  groups: any = [];
  showDialog: boolean = false;
  newGroup: Group = new Group();
  connectedusers!: any[];
  taches: tache[] = [];
  projects: any[] = [];
  userName!: any;
  data: any = [];
  id!: any;
  private avatarSubscription!: Subscription;
  formGroup!: FormGroup;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private service: ServiceService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private sessionM: SessionManagmentService
  ) {}

  ngOnInit(): void {
    this.id = this.sessionM.getdata().id;
    this.userName = this.sessionM.getdata().nom;
    this.getById(this.id);
    this.cd.detectChanges();

    this.items = [
      {
        label: 'Mon Travail',
        icon: 'pi pi-briefcase',
        items: [
          [
            {
              items: [
                { label: 'Tâches en cours', icon: 'pi pi-list' },
                { label: 'Tâches terminées', icon: 'pi pi-check' }
              ]
            }
          ]
        ]
      },
      {
        label: 'Liste',
        icon: 'pi pi-list',
        items: [
          [
            {
              items: [
                { label: 'Toutes les listes', icon: 'pi pi-list' },
                { label: 'Nouvelle liste', icon: 'pi pi-plus' }
              ]
            }
          ]
        ]
      },
      {
        label: 'Équipe',
        icon: 'pi pi-users',
        items: [
          [
            {
              items: [
                { label: 'Membres', icon: 'pi pi-user' },
                { label: 'Equipes', icon: 'pi pi-user-plus', command: () => this.router.navigate(['/user/getallgroups']) },
                { label: 'Ajouter une équipe', icon: 'pi pi-user-plus', command: () => this.router.navigate(['/user/createGrp']) }
              ]
            }
          ]
        ]
      },
      {
        label: 'Tableau de Bord',
        icon: 'pi pi-chart-bar',
        items: [
          [
            {
              items: [
                { label: 'Vue d\'ensemble', icon: 'pi pi-eye', command: () => this.router.navigate(['/user/gettaches']) },
                { label: 'addtache', icon: 'pi pi-eye', command: () => this.router.navigate(['/user/createTache']) },
                { label: 'Statistiques', icon: 'pi pi-chart-line' }
              ]
            }
          ]
        ]
      },
      {
        label: 'Calendrier',
        icon: 'pi pi-calendar',
        items: [
          [
            {
              items: [
                { label: 'Vue mensuelle', icon: 'pi pi-calendar' },
                { label: 'Ajouter un événement', icon: 'pi pi-plus' }
              ]
            }
          ]
        ]
      },
      {
        label: 'Projets',
        icon: 'pi pi-folder',
        items: [
          [
            {
              items: [
                { label: 'Créer un projet', icon: 'pi pi-plus', command: () => this.router.navigate(['/user/addProject']) },
                { label: 'Afficher tous les projets', icon: 'pi pi-list', command: () => this.router.navigate(['/user/getAllProj']) }
              ]
            }
          ]
        ]
      }
    ];
    this.applyStyles();
  }

  applyStyles() {
    const styles = `
      /* Container for the mega menu */
      .p-megamenu-panel {
        background: linear-gradient(#ffffff, #f9f9f9) !important;
        max-width: 0% !important;
        transition: background 0.3s, box-shadow 0.3s !important;
      }

      /* Grid layout for menu items */
      .p-grid {
        display: grid !important;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)) !important;
        gap: 20px !important;
      }

      /* Styling for individual menu items */
      .p-megamenu-panel .p-menuitem {
        background: #ffffff !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
        transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s !important;
      }

      .p-menuitem:hover {
        background-color: #e0e0e0 !important;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2) !important;
        transform: scale(1.02) !important;
      }

      .p-menuitem .pi {
        font-size: 1.4em !important;
        margin-right: 12px !important;
        color: #007bff !important;
        transition: color 0.3s !important;
      }

      .p-menuitem:hover .pi {
        color: #0056b3 !important;
      }

      .p-menuitem span {
        font-size: 1.1em !important;
        color: #333 !important;
        font-weight: 600 !important;
      }

      /* Styling for the avatar group */
      .p-avatarGroup {
        display: flex !important;
        gap: 12px !important;
        align-items: center !important;
      }

      .p-avatar {
        border: 3px solid #ffffff !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
        transition: transform 0.3s, border-color 0.3s !important;
      }

      .p-avatar:hover {
        transform: scale(1.1) !important;
        border-color: #007bff !important;
      }

      /* Add spacing for the mega menu header and end sections */
      .p-megamenu-panel .p-megamenu-header,
      .p-megamenu-panel .p-megamenu-footer {
        margin-bottom: 20px !important;
      }

      .p-megamenu-panel .p-megamenu-header {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        border-bottom: 1px solid #ddd !important;
        padding-bottom: 10px !important;
      }

      .p-megamenu-panel .p-megamenu-footer {
        display: flex !important;
        justify-content: flex-end !important;
      }
    `;

    // Create a style element
    const style = this.renderer.createElement('style');
    style.textContent = styles;

    // Append the style element to the head
    this.renderer.appendChild(this.el.nativeElement.ownerDocument.head, style);
  }

  getById(id: any) {
    this.service.getUserById(id).subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.cd.detectChanges();
    });
  }
}
