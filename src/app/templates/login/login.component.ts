import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { LoginRequest } from "../../services/proxies";
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required]),
  });

  async login(): Promise<void> {
    try {
      await this.authService.login(this.loginFormGroup.value as LoginRequest);
      this.toastr.success('Успішно ввійшли в систему!');
      await this.router.navigate(['students']);
    }
    catch (error) {
      this.toastr.error('Перевірте введені дані та спробуйте ще раз.', 'Щось пішло не так!');
    }
  }
}
