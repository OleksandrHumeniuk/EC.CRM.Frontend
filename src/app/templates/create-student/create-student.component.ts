import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { Client } from "../../services/proxies";
import { StudentFormComponent, StudentFormValues } from "../../containers/student-form/student-form.component";

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [StudentFormComponent, RouterModule],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.scss'
})
export class CreateStudentComponent {
  constructor(private client: Client, private toastr: ToastrService, private router: Router) {}

  handleSubmit = (values: StudentFormValues) => {
    this.client.users(values).subscribe(() => {
      this.toastr.success('Студента успішно створено!');
      this.router.navigate(['/students']);
    },
    (error) => {
      console.log(error);
      this.toastr.error('Перевірте введені дані та спробуйте ще раз.', 'Щось пішло не так!')
    });
  }
}
