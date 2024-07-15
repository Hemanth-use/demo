import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.BASE_URL + 'api/user/signup', userData);
  }
  private BASE_URL = 'http://localhost:8080/';

  login(userLogin: any, userType: string): Observable<any> {
    let endpoint = this.BASE_URL;
    if (userType === 'admin') {
      endpoint += 'api/admin/login';
    } else {
      endpoint += 'api/user/login';
    }
    return this.http.post(endpoint, userLogin);
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  isAdminLoggedIn: boolean = false;

  isLoggedIn(): boolean {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      if (this.router.url === '/login') {
        this.router.navigate(['/dashboard']);
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
