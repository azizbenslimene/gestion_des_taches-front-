import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SessionManagmentService {

 
  constructor(public jwthelper: JwtHelperService) { }

  public savetoken(token: string): void {
    sessionStorage.removeItem('token');
    sessionStorage.setItem('token', token);
  }

  public gettoken(): string | null {
   
    return sessionStorage.getItem('token');

  }

  public getdata(): any {
    try {
      const decodetoken = this.jwthelper.decodeToken(this.gettoken()!);
      if (!decodetoken) {
        throw new Error('Invalid token');
      }
      console.log('decodetoken',decodetoken);
      const { id, nom, email, role } = decodetoken;
      console.log('role:',role);
      console.log('email:',email);

      return { id, nom, email, role };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
