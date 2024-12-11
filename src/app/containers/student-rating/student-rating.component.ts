import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";

import { Client, MentorValuationRequest, MentorValuationResponse, StudentResponse } from "../../services/proxies";
import { AuthService } from "../../services/auth.service";
import { TokenUser } from "../../types/user";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-student-rating',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './student-rating.component.html',
  styleUrl: './student-rating.component.scss'
})
export class StudentRatingComponent implements OnInit {
  @Input({ required: true}) rating!: MentorValuationResponse;
  @Input({ required: true}) student!: StudentResponse;
  @Input({ required: true}) showEmpty!: boolean;

  user: TokenUser | null = null;
  currentRating: number | undefined = undefined;

  constructor(private client: Client, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });

    this.currentRating = this.rating?.valuation;
  }

  get isMyStudent(): boolean {
    return this.user?.uid === this.rating.mentorUid;
  }

  get isRatingAvailable(): boolean {
    if (this.user?.role === 'Director' && !this.rating.wasSetByMentor) return true;
    if (this.user?.role !== 'Mentor') return false;

    return this.isMyStudent;
  }

  get isVisible(): boolean {
    return this.isMyStudent || this.showEmpty || !!this.rating.valuation;
  }

  handleChangeRating = (value: number) => {
    if (!this.isRatingAvailable) return;
    this.currentRating = value;
  }

  handleApplyRating = () => {
  const requestBody: MentorValuationRequest[] = [
    {
      mentorUid: this.rating.mentorUid,
      valuation: this.currentRating,
    }
  ]

  this.client.valuations(this.student.uid ?? '', requestBody).subscribe(
    () => {
      this.toastr.success(`Оцінка для ${this.student.name} успішно збережена!`, 'Успіх!');
      this.rating.valuation = this.currentRating;
    },
    () => {
      this.toastr.error('Щось пішло не так! Спробуйте ще раз.', 'Помилка!')
    });
  }
}
