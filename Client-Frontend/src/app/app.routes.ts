import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AiPoweredMockInterviewComponent } from './Components/ai-powered-mock-interview/ai-powered-mock-interview.component';
import { AiPoweredResumeReviewComponent } from './Components/ai-powered-resume-review/ai-powered-resume-review.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { AuthGuard } from './AuthGuard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', // Full match for default redirect
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./Components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./Components/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'aiPoweredMockInterview',
    loadComponent: () =>
      import('./Components/ai-powered-mock-interview/ai-powered-mock-interview.component').then((m) => m.AiPoweredMockInterviewComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'AiPoweredResumeReview',
    loadComponent: () =>
      import('./Components/ai-powered-resume-review/ai-powered-resume-review.component').then((m) => m.AiPoweredResumeReviewComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'Feedback',
    loadComponent: () =>
      import('./Components/feedback/feedback.component').then((m) => m.FeedbackComponent),
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./Components/forget-password/forget-password.component').then((m) => m.ForgetPasswordComponent),
  },
  {
    path: 'reset-password/:token',
    loadComponent: () => import('./Components/reset-password/reset-password.component').then((m) => m.ResetPasswordComponent)
  },
  {
    path: 'student-details',
    loadComponent: () => import('./Components/students-details/students-details.component').then((m) => m.StudentsDetailsComponent),
    canActivate: [AuthGuard]
  },
];
