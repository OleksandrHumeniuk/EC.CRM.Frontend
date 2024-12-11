import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";

import { Client, StudentApplicationRequest } from "../../services/proxies";
import { StudentFormComponent } from "../../containers/student-form/student-form.component";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [StudentFormComponent],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent {
  constructor(private client: Client, private toastr: ToastrService, private http: HttpClient) {}

  handleSubmit = (values: StudentApplicationRequest) => {
    this.client.application(values).subscribe(
      () => {
        this.downloadTestTask();
        this.toastr.success('Було скачено файл з тестовим завданням!', 'Запит успішно надісланий!');
      },
      () => {
        this.toastr.error('Перевірте введені дані та спробуйте ще раз.', 'Щось пішло не так!')
      });
  }

  downloadTestTask = () => {
    fetch('https://imgur.com/a/G6Rw8PJ', {
      method: 'GET',
      mode: 'no-cors'
    })
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'task.txt');
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        link.remove();
      })
    };
}
