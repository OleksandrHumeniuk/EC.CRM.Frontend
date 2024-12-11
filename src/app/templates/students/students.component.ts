import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { Client, StudentResponse } from '../../services/proxies';
import { StudentCardComponent } from "../../containers/student-card/student-card.component";
import { ButtonComponent } from "../../components/button/button.component";
import { CriteriasModalComponent } from "../../containers/criterias-modal/criterias-modal.component";
import { PreScreenComponent } from "../../components/pre-screen/pre-screen.component";
import { TokenUser } from "../../types/user";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-student-applications',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, PreScreenComponent, StudentCardComponent, ButtonComponent, RouterLink, CriteriasModalComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  students: StudentResponse[] = [];
  isLoading: boolean = true;
  isModalVisible: boolean = false;

  constructor(private client: Client, private authService: AuthService) {}

  user: TokenUser | null = null;

  ngOnInit(): void {
    this.client.applicationAll().subscribe((students: StudentResponse[]) => {
      this.students = students;
      this.isLoading = false;
    });

    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  showModal() {
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }
}

