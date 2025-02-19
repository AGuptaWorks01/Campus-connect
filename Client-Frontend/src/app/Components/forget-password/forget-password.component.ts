import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgetForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submit() {
    if (this.forgetForm.valid) {
      this.authService.requestPasswordReset(this.forgetForm.value.email).subscribe({
        next: (res) => alert(res.message),
        error: (err) => alert(err.error.message)
      });
    }
  }
}

