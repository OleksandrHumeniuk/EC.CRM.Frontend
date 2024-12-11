import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule, NgOptimizedImage } from "@angular/common";

import { StudentResponse } from "../../services/proxies";
import { DateFormatPipe } from "../../pipes/dateFormat.pipe";
import { ButtonComponent } from "../../components/button/button.component";
import { StudentRatingComponent } from "../student-rating/student-rating.component";
import { AuthService } from "../../services/auth.service";
import { TokenUser } from "../../types/user";

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [DateFormatPipe, CommonModule, NgOptimizedImage, ButtonComponent, StudentRatingComponent, RouterLink],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.scss'
})
export class StudentCardComponent implements OnInit{
  @Input({ required: true }) student!: StudentResponse;
  @Input() findMentorView: boolean = false;

  constructor(private authService: AuthService) {}

  user: TokenUser | null = null;

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  get isRatingAvailable(): boolean {
    if (this.user?.role !== 'Mentor') return false;
    if (this.student?.studyFields?.[0].uid !== this.user.studyFieldUids[0]) return false;
    if (!this.user.locationUids.includes(this.student?.locations?.[0]?.uid ?? '')) return false;

    return !this.student.mentorValuations?.some(valuation => valuation.mentorUid === this.user?.uid && valuation.valuation);
  }
}
