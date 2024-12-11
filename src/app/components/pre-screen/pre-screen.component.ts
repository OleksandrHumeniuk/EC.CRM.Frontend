import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-pre-screen',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './pre-screen.component.html',
  styleUrls: ['./pre-screen.component.scss']
})
export class PreScreenComponent implements OnChanges {
  @Input() visible: boolean = true;
  isVisible: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      if (this.visible) {
        this.isVisible = true;
      } else {
        setTimeout(() => this.isVisible = false, 1000);
      }
    }
  }
}
