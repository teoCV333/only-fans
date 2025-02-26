import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Your Express API URL
  private http = inject(HttpClient); // Use inject() instead of constructor

  // Register User
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Login User
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Logout User
  logout() {
    localStorage.removeItem('token');
  }

  // Check if User is Logged In
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
