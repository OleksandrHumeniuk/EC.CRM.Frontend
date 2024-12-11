import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() block: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() onClick = new EventEmitter<void>();

  get combinedClass() {
    return `button button--${this.variant} ${this.class} ${this.block ? 'button--block' : ''}`;
  }

  handleClick() {
    this.onClick.emit();
  }
}
