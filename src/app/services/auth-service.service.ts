// services/auth-service.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() { }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isLoggedInSubject.next(true);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
