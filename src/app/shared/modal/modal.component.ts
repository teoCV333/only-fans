import { Component, inject, signal } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ResponseModalComponent } from "../response-modal/response-modal.component";
import { SuscriptionService } from '../../services/suscription.service';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, FormsModule, ResponseModalComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  modalService = inject(ModalService);
  authService= inject(AuthService);
  suscriptionService= inject(SuscriptionService);

  loginFormActive = signal<boolean>(true);

  name = '';
  email = '';
  password = '';
  errorMessage = '';
  loginError = signal<boolean>(false);


  privacyPolicies() {
    event?.preventDefault();
    window.location.href = atob("aHR0cHM6Ly9vbmx5ZmFucy5jb20vcHJpdmFjeQ==");
  }

  terms() {
    event?.preventDefault();
    window.location.href = atob("aHR0cHM6Ly9vbmx5ZmFucy5jb20vdGVybXM=");
  }

  changeForm() {
    this.loginFormActive.update((current) => !current);
  }


  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        window.location.reload()
      },
      error: (error) => {
        this.loginError.set(true);
        this.errorMessage = error.error.message;
        this.modalService.toggleResponseModal();
        setTimeout(() => {
          this.modalService.toggleResponseModal();
        }, 3000);
      }
    });
  }

  register() {
    this.authService.register({name: this.name, email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.loginFormActive.set(true)
      },
      error: (error) => {
        this.loginError.set(true);
        this.errorMessage = error.error.message;
        this.modalService.toggleResponseModal();
        setTimeout(() => {
          this.modalService.toggleResponseModal();
        }, 3000);
      }
    });
  }
}
