import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ModalComponent } from "./shared/modal/modal.component";
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export default class AppComponent {
  modalService = inject(ModalService);

  title = 'only-f';
  activeSection = signal<number>(1);



  menuOptions = [
    {
      url: '#',
      icon: 'fa fa-home',
      title: 'Inicio',
    },
    /* {
      url: '#',
      icon: 'fa fa-bell',
      title: 'Notificaciones',
    },
    {
      url: '#',
      icon: 'fa fa-comment',
      title: 'Mensajes',
    },
    {
      url: '#',
      icon: 'fa fa-bookmark',
      title: 'Colecciones',
    },
    {
      url: '#',
      icon: 'fas fa-user-friends',
      title: 'Suscripciones',
    },
    {
      url: '#',
      icon: 'fa fa-credit-card',
      title: 'Añadir tarjeta',
    },
    {
      url: '#',
      icon: 'fas fa-user-circle',
      title: 'Mi perfil',
    },
    {
      url: '#',
      icon: 'fas fa-ellipsis-h',
      title: 'Más',
    }, */

  ]

  changeSection(section: number) {
    if (this.activeSection() != section) {
      this.activeSection.set(section);
    }
  }
}
