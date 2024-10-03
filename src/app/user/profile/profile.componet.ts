import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { SessionManagmentService } from 'src/app/service/session-managment.service';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  currentUser!: any;
  id!: any;
  data: any = [];
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null; // Variable pour stocker l'URL de prévisualisation

  constructor(
    private sessionM: SessionManagmentService,
    private service: ServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  getById(id: any) {
    this.service.getUserById(id).subscribe(res => {
      this.data = res;
      this.cdr.detectChanges(); // Trigger change detection manually
      console.log(this.data);
    });
  }

  ngOnInit() {
    this.id = this.sessionM.getdata().id;
    this.getById(this.id);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0] as File;

      // Utiliser FileReader pour générer l'URL de prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
        this.cdr.detectChanges(); // Update the view with the new preview
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  update() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('files', this.selectedFile, this.selectedFile.name);
  
      this.service.uploadImage(formData, this.id).subscribe(res => {
        this.getById(this.id);
  
        // Mettre à jour l'URL de l'avatar via le service
        this.service.updateAvatarUrl(this.data.avatarUrl);
  
        this.cdr.detectChanges();
        console.log("url", this.data.avatarUrl);
        console.log(res);
      });
    } else {
      console.log("Aucun fichier sélectionné");
    }
  }
  
  triggerFileInput() {
    const fileInput = document.getElementById('upload-avatar') as HTMLInputElement;
    fileInput.click();
  }
}
