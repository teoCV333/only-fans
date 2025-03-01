import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-response-modal',
  imports: [],
  templateUrl: './response-modal.component.html',
  styles: ``
})
export class ResponseModalComponent {
@Input() errorMessage!: string;
}
