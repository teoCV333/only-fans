import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, switchMap, throwError } from 'rxjs';

interface ValidateSub {
  activeSub: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {
  private apiUrlUser = 'https://ufapi.store/api/user'; // Your Express API URL
  private apiUrl = 'https://ufapi.store/api/paymethod'; // Your Express API URL
  private http = inject(HttpClient); // Use inject() instead of constructor
  private token = localStorage.getItem('token');

  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  activeSubscription = signal<{ activeSub: boolean }>({activeSub: false}); 

  constructor() {
    this.fetchSubscriptionStatus(); // Fetch subscription status on service initialization
    console.log(this.activeSubscription())
  }

  fetchSubscriptionStatus() {
    this.http.get<ValidateSub>(`${this.apiUrlUser}/validatesub`, { headers: this.headers })
      .subscribe({
        next: (res) => this.activeSubscription.set(res),
        error: (error) => {
          console.log(error)
          /* if(error.status == 401) {
            localStorage.removeItem('token');
          } */
        } // Handle error case
      });
  }

  addPaymentMethod(body: any) {
    return this.http.post(`${this.apiUrl}/addpm`, body, { headers: this.headers }).pipe(
      switchMap((response: any) => {
        if (response.success) {  // Assuming 'success' flag in the response
          return this.activateSubscription();
        } else {
          throw new Error("Payment method addition failed");
        }
      }),
      catchError((error) => {
        console.error("Payment Error:", error);
        return throwError(() => error);
      })
    );
  }
  
  activateSubscription() {
    return this.http.get(`${this.apiUrlUser}/activatesub`, { headers: this.headers });
  }
  
  deactivateSuscription() {
    this.http.get(`${this.apiUrlUser}/cancelsub`, { headers: this.headers }).subscribe((res) => {
    })
  }
}

