import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SuscriptionService } from '../services/suscription.service'; // Import the service

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  router = inject(Router);
  suscriptionService = inject(SuscriptionService); // Inject the service

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    if (token) {
      if (this.isTokenExpired(token)) {
        console.warn('Token expired. Attempting refresh...');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }

      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          console.warn('Unauthorized request. Removing token...');
          this.handleLogout();
        }
        return throwError(() => error);
      })
    );
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() >= exp;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }

  private handleLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }
}
