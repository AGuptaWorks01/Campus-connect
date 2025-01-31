import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService); // Inject your AuthService
  router = inject(Router);

  showPassword: boolean = false; // Initialize password visibility flag
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required], // Username field
      email: ['', Validators.compose([Validators.required, Validators.email])], // Email field
      password: ['', Validators.required], // Password field
    });
  }

  register() {
    // Register the user via AuthService
    this.authService.registerService(this.registerForm.value).subscribe({
      next: () => {
        alert('User registered successfully!');
        this.registerForm.reset();
        this.router.navigateByUrl('login');
      },
      error: (err) => {
        console.log(err);
        alert('Error while registering!');
      },
    });
  }
}