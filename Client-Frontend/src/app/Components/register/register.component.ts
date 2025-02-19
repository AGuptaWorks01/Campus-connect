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
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService); // Inject your AuthService
  router = inject(Router);

  showPassword: boolean = false; // Initialize password visibility flag
  registerForm!: FormGroup;
  registrationSuccess: boolean = false; // New flag for success message
  errorMessage: string = ''; // Store error message
  showErrorMessages: boolean = false; // Flag to show error messages

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
        this.registrationSuccess = true;  // Set success to true
        this.errorMessage = '';  // Clear any previous error message
        this.showErrorMessages = false; // Hide error message if successful
        this.registerForm.reset();

        // Redirect after 0.5 seconds
        setTimeout(() => {
          this.router.navigateByUrl('login');
        }, 500);
      },
      error: (err) => {
        console.log(err);
        this.registrationSuccess = false;  // Set success to false
        this.showErrorMessages = true;  // Show the error message

        if (err && err.error && err.error.message === 'Email already exists') {
          this.errorMessage = 'User already exists. Please try with a different email.';
        } else {
          this.errorMessage = 'Error while registering!';
        }
      },
    });
  }

  dismissError() { 
    this.showErrorMessages = false; // Dismiss error message
  }
}
