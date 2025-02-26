import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { SuscriptionService } from './suscription.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private authService = inject(AuthService);
  private suscriptionService = inject(SuscriptionService);
  public showModal = signal<boolean>(false);
  public showAddCardModal = signal<boolean>(false);
  public logged = signal<boolean>(false);
  public showPaymentModal = signal<boolean>(false);
  public showResponseModal = signal<boolean>(false);


  constructor() { 
    this.logged.set(this.authService.isLoggedIn() ? true : false);
  }

  toggleModal() {
    this.showModal.update((current) => !current);
  }

  toggleAddCardModal() {
    this.showAddCardModal.update((current) => !current);
  }

  login() {
    this.logged.set(true);
    this.toggleModal();
    if(!this.suscriptionService.activeSubscription()) {
      this.toggleAddCardModal();
    }
  }

  logout() {
    this.logged.set(false);
  }

  togglePaymentModal() {
    this.showPaymentModal.update((current) => !current);
  }

  toggleResponseModal() {
    this.showResponseModal.update((current) => !current);
  }


  closeAll() {
    this.showModal.set(false);
    this.showAddCardModal.set(false);
    this.showPaymentModal.set(false);
    this.showResponseModal.set(false);
  }

}
