import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  showModal = signal<boolean>(false);

  constructor() { }

  toggleModal() {
    this.showModal.update((current) => !current);
  }
}
