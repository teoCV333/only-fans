import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css'
})
export class CustomSelectComponent {
  @Input() options: any[] = [];
  @Input() selectedOption?: string;
  @Input() selectedFlag?: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.options[0])
    this.selectedOption = this.options[0].name;
    this.selectedFlag = this.options[0].flag;
  }

  selectOption(option: any) {
    console.log(option)
    this.selectedOption = option;
  }
  selectFlag(option: any) {
    this.selectedFlag = option;
  }

  toggleOptions() {
    const optionsDiv = document.querySelector('.options');
    optionsDiv?.classList.toggle('open');
  }
}
