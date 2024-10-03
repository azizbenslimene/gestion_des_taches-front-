import { Component, OnInit } from '@angular/core';
import { tache, StatusTache } from '../../models/tache';
import { Comment } from '../../models/comment';
import { ServiceService } from '../../service/service.service';
import { formatDate } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
import { SessionManagmentService } from 'src/app/service/session-managment.service';
import { replies } from 'src/app/models/replies';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {
  taches: tache[] = [];
  selectedCommentId?: any; // Set this when a comment is selected
  replyDesc: string = '';
  draggedTache: tache | null = null;
  statistics: any = {};
  selectedTache: any;
  displayDialog: boolean = false;
  StatusTache = StatusTache; 
  visible: boolean = false;
  commentaire: string = '';
  formattedStartDate: string = '';
  formattedEndDate: string = '';
  cmnt: Comment[] = [];
  currentUser?: User;
  parentCommentId!: string; // Remplacer par l'ID du commentaire parent
  comment!: Comment;
  commentDialogVisible!: boolean ;
  replyDialogVisible: boolean = false;
  selectedComment: any ;
  reply: string = '';
  updatedCommentText: string = '';
  commentIdToUpdate?: string;
  updatedReplyText: any = '';
  replyIdToUpdate?: any;
  selectedReply?: replies;
  id!:any
  commentDialogupdate!:boolean;
  sanitizedComment!: SafeHtml;
  replyDialogupdate: boolean = false;
  rep !:replies




  constructor(private service: ServiceService,private sanitizer: DomSanitizer , private sesMan:SessionManagmentService,private ar: ActivatedRoute) {
    this.id = this.ar.snapshot.paramMap.get('id');  
  }

  ngOnInit(): void {
    this.getTaches();
    this.currentUser = this.sesMan.getdata().id; // Ensure this method returns a valid User
  }



  getTaches(): void {
    this.service.gettaches().subscribe(res => {
      this.taches = res;
      console.log(res);
    });
  }

  dragStart(tach: tache) {
    this.draggedTache = tach;
    console.log(tach.tacheid);
  }

  drop(newStatus: string) {
    if (this.draggedTache) {
      this.draggedTache.status = newStatus as StatusTache;
      this.updateTache(this.draggedTache.tacheid, this.draggedTache);
      this.draggedTache = null;
    }
  }

  showDialog() {
    this.visible = true;
  }

  updateTache(idTache: any, tach: tache) {
    this.service.updatetache(idTache, tach).subscribe({
      next: () => {
        console.log('Tâche mise à jour');
        this.getTaches();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la tâche', error);
      }
    });
  }

  dragEnd() {
    this.draggedTache = null;
  }

  openCommentDialog(tache: any) {
    this.selectedTache = tache;
    this.commentaire = ''; // Réinitialiser le champ de commentaire
    this.commentDialogVisible = true;
  }
  openReplyDialog(comment: any) {
  
      console.log('Selected Comment ID:', comment._id); // Vérifiez que l'ID est correct
      
      this.selectedTache = this.taches.find(t => t.cmnt.includes(comment)); // Trouver la tâche à partir du commentaire

      this.selectedCommentId = comment._id;
      this.replyDialogVisible = true;
    
    this.selectedComment = comment;
    this.reply = ''; // Réinitialiser le champ de réponse
    this.replyDialogVisible = true;
  }

  hideCommentDialog() {
    this.commentDialogVisible = false;
    this.selectedTache = null;
  }

  // Fermer le dialogue de réponse
  hideReplyDialog() {
    this.replyDialogVisible = false;
    this.selectedComment = null;
  }
  saveComment(): void {
    if (!this.selectedTache) {
      console.error('Error: selectedTache is undefined.');
      return;
    }
    
    if (!this.currentUser) {
      console.error('Error: currentUser is undefined.');
      return;
    }
  
    const newComment: any = {
      descCmnt: this.commentaire,
      dateCmnt: new Date(),
      user: this.sesMan.getdata(),
    };
  
    console.log(newComment);
  
    this.service.addcmnt(this.selectedTache.tacheid, newComment,).subscribe({
      next: (updatedTache) => {
        // Find the updated task in the task list and update the comments
        const index = this.taches.findIndex(t => t.tacheid === updatedTache.tacheid);
        if (index !== -1) {
          this.taches[index] = updatedTache; // Update the task with the comments
        }
        this.selectedTache = updatedTache;
        this.getTaches();
        this.hideCommentDialog();
        this.hideReplyDialog();
      },
      error: (error) => {
        console.error('Error adding comment', error);
      }
    });
  }
  
  

  getcmnt(): void {
    this.service.getallcmnts().subscribe(res => this.cmnt = res);
  }

  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  addReplyToComment(): void {
    console.log('Selected Comment ID:', this.selectedCommentId);
    
    // Validate reply description and selected comment ID
    if (!this.replyDesc || !this.selectedCommentId) {
      console.error('Reply description or selected comment is missing');
      return;
    }
  
    // Ensure that the selected task and task ID are available
    if (this.selectedTache && this.selectedTache.tacheid) {
      const reply: any = {
        desc: this.replyDesc,                       // Reply description
        tacheid: this.selectedTache.tacheid,        // Task ID
        user: this.sesMan.getdata().id,             // User ID from session manager
        cmnt: this.selectedCommentId,               // Comment ID to attach reply
        dateR: new Date()                           // Add current date
      };
      
      console.log('Selected Tache:', this.selectedTache);
  
      // Call the service to add the reply
      this.service.addReply(reply).subscribe({
        next: (response) => {
          console.log('Reply added successfully', response);
  
          // Find the comment and push the new reply to its replies array
          const comment = this.taches.find(t => t.tacheid === reply.tacheid)?.cmnt.find(c => c._id === reply.cmnt);
          if (comment) {
            comment.replies.push(response); // Add the new reply to the existing comment
          }
  
          // Clear input fields after successful reply
          this.replyDesc = '';
          this.selectedCommentId = undefined;
  
          // Hide the reply dialog
          this.hideReplyDialog();
        },
        error: (error) => {
          console.error('Error adding reply', error);
        }
      });
    } else {
      console.error('Selected task or task ID is missing');
    }
  }
  
  
  
deleteComment(commentId: string): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
    this.service.deleteComment(commentId).subscribe({
      next: () => {
        console.log('Commentaire supprimé');
        this.getTaches();  // Rafraîchir la liste des tâches et des commentaires
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du commentaire', error);
      }
    });
  }
}

// Méthode pour supprimer une réponse
deleteReply(replyId: any): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette réponse ?')) {
    console.log(replyId)
    this.service.deleteReply(replyId).subscribe({
      next: () => {
        console.log('Réponse supprimée');
        this.getTaches();  // Rafraîchir la liste des tâches et des commentaires
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la réponse', error);
      }
    });
  }
}
startEditingComment(commentId: any ): void {
  console.log('Editing Comment ID:', commentId);
  const allComments = this.taches.flatMap(tache => tache.cmnt);
  console.log('All Comments:', allComments);
  
  const comment = allComments.find(cmnt => cmnt._id === commentId);
  if (comment) {
    this.selectedComment = comment; console.log('Selected Comment:', comment)
    this.updatedCommentText = comment.descCmnt; console.log(comment.descCmnt)  
    this.commentIdToUpdate = comment._id;  
    this.commentDialogupdate = true;  
  } else {
    console.error('Comment not found');
  }
}




// Save updated comment
saveUpdatedComment(): void { 
  this.sanitizedComment = this.getSafeHtml(this.updatedCommentText);

  if (this.commentIdToUpdate && this.updatedCommentText.trim() !== '') {
    const updatedComment: Comment = {
      ...this.selectedComment!,  // Copie les données existantes
      descCmnt: this.updatedCommentText  // Met à jour la description
    };

    // Appelle le service pour mettre à jour le commentaire
    this.service.updateComment(this.commentIdToUpdate, updatedComment).subscribe({
      next: (response) => {
        console.log('Commentaire mis à jour avec succès', response);
        this.getTaches();  // Rafraîchit la liste des commentaires
        this.cancelEdit();  // Quitte le mode édition
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du commentaire', error);
      }
    });
  } else {
    console.error('Le texte du commentaire est vide ou aucun commentaire n\'a été sélectionné');
  }
} 


startEditingReply(replyId: any): void {
  console.log('Editing Reply ID:', replyId);
  this.sanitizedComment = this.getSafeHtml(this.updatedReplyText);

  
  // Trouver la réponse correspondante
  const reply = this.taches.flatMap(tache => tache.cmnt.flatMap(cmnt => cmnt.replies)).find(rep => rep._id === replyId);
  
  if (reply) {
    this.selectedReply = reply;
    this.updatedReplyText = reply.desc;  // Définir le texte de la réponse à éditer
    this.replyIdToUpdate = reply._id;  // Définir l'ID de la réponse à mettre à jour

    // Ouvrir le dialogue pour l'édition
    this.replyDialogupdate = true;
  } else {
    console.error('Réponse non trouvée');
  }
}

// Save updated reply
saveUpdatedReply(): void {
  if (this.replyIdToUpdate && this.updatedReplyText.trim() !== '') {
    const updatedReply: replies = {
      ...this.selectedReply!,  // Copier les données existantes
      desc: this.updatedReplyText,
      dateR: this.selectedReply?.dateR || new Date()  // Conserver la dateR ou définir la date actuelle
    };

    this.service.updateReply(this.replyIdToUpdate, updatedReply).subscribe({
      next: (response) => {
        console.log('Réponse mise à jour avec succès', response);
        this.getTaches();  // Rafraîchir la liste des réponses
        this.cancelEdit();  // Quitter le mode édition
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la réponse', error);
      }
    });
  } else {
    console.error('Le texte de la réponse est vide ou aucune réponse n\'a été sélectionnée');
  }
}


// Cancel editing and reset the form
cancelEdit(): void {
  this.selectedComment = undefined;
  this.updatedCommentText = '';
  this.commentIdToUpdate = undefined;
  this.selectedReply = undefined;
  this.updatedReplyText = '';
  this.replyIdToUpdate = undefined;
  this.selectedReply = undefined;
  this.replyDialogVisible = false;
}

}