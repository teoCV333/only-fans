import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

interface ValidateSub {
  activeSub: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {
  private apiUrl = 'http://localhost:3000/user'; // Your Express API URL
  private http = inject(HttpClient); // Use inject() instead of constructor
  private token = localStorage.getItem('token');

  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  activeSubscription = toSignal(
    this.http.get<ValidateSub>(`${this.apiUrl}/validatesub`, { headers: this.headers }),
    { initialValue: {activeSub: false} } // or any default value
  );

  constructor() { }

  activateSuscription() {
    this.http.get(`${this.apiUrl}/activatesub`, { headers: this.headers }).subscribe((res) => {
    })
  }

  deactivateSuscription() {
    this.http.get(`${this.apiUrl}/cancelsub`, { headers: this.headers }).subscribe((res) => {
    })
  }
}

