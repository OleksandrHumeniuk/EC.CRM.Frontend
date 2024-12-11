import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";

import { Client, StudentResponse } from "../../services/proxies";
import { StudentFormComponent, StudentFormValues } from "../../containers/student-form/student-form.component";
import { PreScreenComponent } from "../../components/pre-screen/pre-screen.component";

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [StudentFormComponent, CommonModule, RouterModule, PreScreenComponent],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss'
})
export class EditStudentComponent implements OnInit{
  student: StudentResponse | undefined = undefined;
  isLoading: boolean = true;

  constructor(private client: Client, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {}

  get initialValues(): StudentFormValues {
    return {
      name: this.student?.name,
      email: this.student?.email,
      phoneNumber: this.student?.phoneNumber,
      skillsUids: this.student?.skills?.map((skill) => skill.uid ?? '') ?? [],
      nonProffesionalInterestsUids: this.student?.nonProfessionalInterests?.map((interest) => interest.uid ?? ''),
      description: this.student?.description,

      // @ts-ignore
      desiredStudyFieldUid: this.student?.studyFields[0].uid ?? '',
      // @ts-ignore
      locationUid: this.student?.locations[0].uid ?? '',
    };
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.client.studentsGET(params.get('id') ?? '').subscribe((student) => {
        this.student = student ;

        this.isLoading = false;
      });
    })
  }

  handleSubmit(student: StudentFormValues) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.client.studentsPUT(params.get('id') ?? '', student).subscribe(
      () => {
        this.toastr.success('Інформацію про студента успішно оновлено!');
        this.router.navigate(['/students']);
      },
      (error) => {
        console.log(error);
        this.toastr.error('Перевірте введені дані та спробуйте ще раз.', 'Щось пішло не так!')
      });
    })
  }
}
