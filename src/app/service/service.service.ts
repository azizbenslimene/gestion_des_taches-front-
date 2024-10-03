import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environement } from 'src/app/environement';
import { User } from '../models/user';
import { Group } from '../models/group';
import { tache } from '../models/tache';
import { Comment } from '../models/comment';
import { Project } from '../models/project';
import { replies } from '../models/replies';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor( private http : HttpClient) { }


  getBackendPublicIp(): Observable<any> {
    return this.http.get<any>(`${environement.baseUrl}/get-public-ip`); // Call your backend endpoint
  }

  register(user:any):Observable<any> {
    return this.http.post<any>(`${environement.baseUrl}/register`,user);
  }

  login(user:User):Observable<any> {
    return this.http.post<any>(`${environement.baseUrl}/login`,user);
  }

  verifyUserCode(emailUser: any, verificationCode: any): Observable<any> {
    return this.http.post<any>(`${environement.baseUrl}/verifyUser`, { emailUser, verificationCode });
  }
  updateVerificationStatus(emailUser: any): Observable<any> {
    return this.http.post<any>(`${environement.baseUrl}/update-verification-status`, { emailUser });
  }
  getUserById(userId:any ):Observable<any> {
    return this.http.get<any>(`${environement.baseUrl}/profile/${userId}`);
  }

  verifyIp(userId: any, ip: any): Observable<any> {
    const url = `${environement.baseUrl}/verify-ip/${userId}/${ip}`;
    return this.http.get<any>(url);
  }

  uploadImage(user:FormData,userId:any):Observable<any> {
    return this.http.put<any>(`${environement.baseUrl}/profile/${userId}/ProfilAvatar`,user);
  }


  addgroup(grp:Group):Observable<any> {
    return this.http.post<any>(`${environement.baseUrl}/user/createGrp`,grp);
  }
  getallgroup(): Observable<any> {

    return this.http.get<any>(`${environement.baseUrl}/user/getallgroups`,);
  }
  updateGroup(id: any, group: Group): Observable<any> {
    return this.http.put(`${environement.baseUrl}/user/updateGrp/${id}`,group);
  }

  getConnectedUsers(): Observable<any> {
    return this.http.get<any>(`${environement.baseUrl}/connected`);
  }
  addtache(tach:tache): Observable<any> {
    return this.http.post<any>(`${environement.baseUrl}/user/createTache`,tach);

  }
  gettaches(): Observable<tache[]> {
    return this.http.get<tache[]>(`${environement.baseUrl}/user/gettaches`).pipe(
      map((taches: any[]) => {
        return taches.map(tache => {
          return {
            ...tache,
            tacheid: tache._id // Mapper _id à tacheid
          };
        });
      })
    );
  }

  updatetache(idTache: any, tache: tache): Observable<any> {
    return this.http.put<any>(`${environement.baseUrl}/user/updateTache/${idTache}`, tache);
  }
  
  getallcmnts(): Observable<any[]> {
    return this.http.get<any>(`${environement.baseUrl}/user/getallCmnt`);
  }

  addcmnt(tacheId: string, comment: Comment): Observable<any> {
    return this.http.post<any>(`${environement.baseUrl}/user/createComment`, { tacheId, ...comment });
  }
  deleteComment(commentId: any): Observable<any> {
    return this.http.delete<any>(`${environement.baseUrl}/user/deleteComment/${commentId}`);
  }
  updateComment(commentId: any, comment: Comment): Observable<any> {
  return this.http.put<any>(`${environement.baseUrl}/user/updateComment/${commentId}`, comment);
}
  addproject(proj: Project): Observable<any> {
    return this.http.post<any>(`${environement.baseUrl}/user/addProject`,proj);
  }

  getprojects(): Observable<any[]> {
    return this.http.get<any>(`${environement.baseUrl}/user/getAllProj`);
  }
  addReply(reply:replies): Observable<any> {
    return this.http.post<any>(`${environement.baseUrl}/user/addreplies`,reply);
  }

  updateReply(id: any, reply: replies): Observable<any> {
    return this.http.put<any>(`${environement.baseUrl}/user/updatereplies/${id}`, reply);
  }

  deleteReply(replyId: any): Observable<any> {
    return this.http.delete<any>(`${environement.baseUrl}/user/removereplies/${replyId}`);
  }

  private avatarUrlSubject = new BehaviorSubject<string>('');
  avatarUrl$ = this.avatarUrlSubject.asObservable();

  // Méthode pour mettre à jour l'URL de l'avatar
  updateAvatarUrl(url: string) {
    this.avatarUrlSubject.next(url);
  }

  Senndinvi(body :any): Observable<any> {

    return this.http.post<any>(`${environement.baseUrl}/Senndinvi`,body);
  }
  checkUserExists(email: any): Observable<any> {
    return this.http.post<any>(`${environement.baseUrl}/checkUser`,   { emailUser: email } );
  }

  getUsers(role?: string): Observable<any[]> {
    let params = new HttpParams();
    if (role) {
      params = params.set('role', role); // Ajoute le rôle aux paramètres de la requête
    }

    return this.http.get<any[]>(`${environement.baseUrl}/usersByRole`, { params }).pipe(
      tap(data => console.log('Données reçues:', data)) ); // Appel GET avec les paramètres
  }
  updateUserRole(id: any, role: string): Observable<any> {
    return this.http.put<any>(`${environement.baseUrl}/users/${id}/role`, { role });
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(`${environement.baseUrl}/deleteUser/${id}`);
  }

  deleteGroup(id: any): Observable<any> {
    return this.http.delete<any>(`${environement.baseUrl}/user/deleteGrp/${id}`);
  }
  
  deleteProj(id: any): Observable<any> {
    return this.http.delete<any>(`${environement.baseUrl}/user/deleteProj/${id}`);
  }
}

