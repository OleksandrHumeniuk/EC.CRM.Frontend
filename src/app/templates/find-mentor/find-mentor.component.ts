import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ActivatedRoute, ParamMap, Router, RouterModule } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { Client, MatchingResponse, StudentResponse } from "../../services/proxies";
import { StudentFormComponent } from "../../containers/student-form/student-form.component";
import { PreScreenComponent } from "../../components/pre-screen/pre-screen.component";
import { StudentCardComponent } from "../../containers/student-card/student-card.component";
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-find-mentor',
  standalone: true,
  imports: [StudentFormComponent, CommonModule, RouterModule, PreScreenComponent, StudentCardComponent, ButtonComponent],
  templateUrl: './find-mentor.component.html',
  styleUrl: './find-mentor.component.scss'
})
export class FindMentorComponent  implements OnInit {
  student: StudentResponse | undefined = undefined;
  mentor: MatchingResponse | undefined = undefined;
  isLoading: boolean = true;

  constructor(private client: Client, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.client.studentsGET(params.get('id') ?? '').subscribe((student) => {
        this.student = student;
        this.isLoading = false;
      });
    })
  }

  handleRequestMentor() {
    this.client.studentsPATCH(this.student?.uid ?? '', false).subscribe((mentor) => {
      this.toastr.success('Ментор успішно підібраний', 'Успіх!');
      this.mentor = mentor;
    });
  }

  handleConfirmMentor() {
    this.client.studentsPATCH(this.student?.uid ?? '', true).subscribe(() => {
      this.toastr.success('Ментор успішно підтверджений!', 'Успіх!');
      this.router.navigate(['/students']);
    });
  }
}
