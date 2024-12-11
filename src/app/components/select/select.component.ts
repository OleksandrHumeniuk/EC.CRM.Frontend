import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { Option } from "../../types/options";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() options: Option[] = [];
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = true;

  @Input() value: string = '';
  @Output() onValueChange = new EventEmitter<string>();

  isSelectOpen: boolean = false;

  get selectedItem(): string {
    const found = this.options.find(option => option.id === this.value)?.title;
    return found || '';
  }

  handleClick = (): void => {
    this.isSelectOpen = true;
  };

  handleFocus = (): void => {
    if (this.isSelectOpen) return;
    this.isSelectOpen = true;
  };

  handleBlur = (): void => {
    this.isSelectOpen = false;
  };

  handleSelectOption = (option: Option): void => {
    this.value = option.title;
    this.isSelectOpen = false;
    this.onValueChange.emit(option.id);
  }
}
