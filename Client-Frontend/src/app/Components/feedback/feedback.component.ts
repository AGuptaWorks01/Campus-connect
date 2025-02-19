import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent  implements OnInit{
  feedbackForm: FormGroup;
  feedbackService = inject(FeedbackService);
  selectedRating = 0;
  feedbackList: any[] = []; // Store fetched feedbacks
  feedbackSuccess: boolean = false; // New flag for success message

  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      review: ['', Validators.required],
    });
  }

  ngOnInit(): void {
      this.getFeedbacks()
  }

  setRating(rating: number) {
    this.selectedRating = rating;
    this.feedbackForm.patchValue({ rating });
  }

  submitFeedback() {
    if (this.feedbackForm.valid) {
      this.feedbackService.postFeedback(this.feedbackForm.value).subscribe(
        () => {
          this.feedbackSuccess = true;  // Set success to true
          // Reset form after feedback submission
          this.feedbackForm.reset();
          this.selectedRating = 0;
          this.getFeedbacks(); // Refresh the feedback list

          // Hide success message after 1 second
          setTimeout(() => {
            this.feedbackSuccess = false;
          }, 1000); // 1000 ms = 1 second
        },
        (error) => {
          console.error('Error submitting feedback:', error);
        }
      );
    }
  }


  getFeedbacks() {
    this.feedbackService.getAllFeedback().subscribe(
      (data) => {
        this.feedbackList = data;
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }
}