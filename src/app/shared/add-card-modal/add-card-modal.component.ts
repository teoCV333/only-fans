import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { PaymentFormComponent } from "../payment-form/payment-form.component";

@Component({
  selector: 'app-add-card-modal',
  imports: [PaymentFormComponent],
  templateUrl: './add-card-modal.component.html',
  styleUrl: './add-card-modal.component.css'
})
export class AddCardModalComponent {
  modalService = inject(ModalService);
  
  closeCardModal() {
    this.modalService.toggleAddCardModal();
  }

  openPaymentModal() {
    this.modalService.togglePaymentModal();
  }
}
