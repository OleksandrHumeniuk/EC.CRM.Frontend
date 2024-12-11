import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnChanges, Output, } from '@angular/core';
import { CommonModule } from "@angular/common";

import { CriteriasExampleComponent } from "../criterias-example/criterias-example.component";
import { CsvUploadComponent } from "../csv-upload/csv-upload.component";
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  standalone: true,
  selector: 'app-criterias-modal',
  templateUrl: './criterias-modal.component.html',
  styleUrls: ['./criterias-modal.component.scss'],
  imports: [CommonModule, CriteriasExampleComponent, CsvUploadComponent, ButtonComponent],
})
export class CriteriasModalComponent implements OnChanges {
  @Input({ required: true}) visible!: boolean;

  @Output() onClose = new EventEmitter<void>();

  private isContentReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    if (this.visible) {
      setTimeout(() => {
        this.isContentReady = true;
        this.cdr.detectChanges();
      }, 20);
    } else {
      this.isContentReady = false;
    }
  }

  closeModal() {
    this.onClose.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.visible && this.isContentReady && !this.isClickInsideModal(event)) {
      this.closeModal();
    }
  }

  private isClickInsideModal(event: MouseEvent): boolean {
    const modalContent = document.querySelector('#modal-content');
    return modalContent?.contains(event.target as Node) ?? false;
  }
}
