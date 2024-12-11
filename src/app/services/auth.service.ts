import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { Client, LoginRequest } from './proxies';
import { TokenUser } from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOCAL_STORAGE_TOKEN = 'token';

  private userSubject = new BehaviorSubject<TokenUser | null>(this.getUser());
  user = this.userSubject.asObservable();

  constructor(private client: Client) {}

  private getUser(): TokenUser | null {
    const token = localStorage.getItem(this.LOCAL_STORAGE_TOKEN);

    if (!token) return null;

    const decodedToken = jwtDecode(token) as Record<string, string>;

    return {
      email: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      locationUids: decodedToken['LocationUids'].split(','),
      studyFieldUids: decodedToken['StudyFieldUids'].split(','),
      uid: decodedToken['uid'],
    } as TokenUser;
  }

  updateUser(): void {
    this.userSubject.next(this.getUser());
  }

  login(loginRequest: LoginRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.login(loginRequest).subscribe(
      (jwtDTO) => {
        const { token } = jwtDTO;

        this.client.setAuthToken(jwtDTO.token!);
        localStorage.setItem(this.LOCAL_STORAGE_TOKEN, token ?? '');
        this.updateUser();

        resolve();
      },
      () => {
        reject();
      });
    });
  }

  logout(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN);
    this.updateUser();
    this.client.setAuthToken('');
  }
}

