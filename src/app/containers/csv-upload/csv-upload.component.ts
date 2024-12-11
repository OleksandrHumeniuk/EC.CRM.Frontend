import { Component, EventEmitter, Output } from '@angular/core';

import { Client } from "../../services/proxies";
import { ButtonComponent } from "../../components/button/button.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-csv-uploader',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss'],
  imports: [ButtonComponent],
  standalone: true
})
export class CsvUploadComponent {
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();

  constructor(private client: Client, private toastr: ToastrService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.client.registerCriterias(5, {
        data: file,
        fileName: file.name,
      }).subscribe(
        (response) => {
          this.toastr.success('Критерії успішно завантажені!', 'Успіх!');
          this.onSuccess.emit();
        },
        (error) => {
          this.toastr.error('Перевірте формат файлу та спробуйте ще раз.', 'Щось пішло не так!');
        }
      );
    }
  }

  get fileInput(): HTMLInputElement {
    return document.getElementById('fileInput') as HTMLInputElement;
  }
}
