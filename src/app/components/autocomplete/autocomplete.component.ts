import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { Option } from "../../types/options";

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent {
  @Input() options: Option[] = [];
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = true;
  @Input() selectText: string = '';
  @Input() name: string = '';

  @Output() onSelectValue = new EventEmitter<string>();

  isSelectOpen: boolean = false;

  get filteredOptions(): Option[] {
    return this.options.filter(option => option.title!.toLowerCase().includes(this.selectText.toLowerCase()));
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
    this.isSelectOpen = false;
    this.selectText = '';
    this.onSelectValue.emit(option.id);
  }
}
