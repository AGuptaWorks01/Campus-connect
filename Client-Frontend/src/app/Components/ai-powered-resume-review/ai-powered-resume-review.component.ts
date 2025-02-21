import { Component } from '@angular/core';
import { GeminiAiService } from '../../services/gemini-ai.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-powered-resume-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-powered-resume-review.component.html',
  styleUrls: ['./ai-powered-resume-review.component.css']
})
export class AiPoweredResumeReviewComponent {
  customMessage: string = ''; // Initialize as empty string
  resumeFile: File | null = null;
  resumeReview: any = null;  // Will hold structured review
  isLoading: boolean = false;
  fileName: string = ''; // Holds the file name for display

  constructor(private geminiAiService: GeminiAiService) { }

  // Handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.resumeFile = file;
      this.fileName = file.name;  // Store the file name for display
    } else {
      alert('Please upload a valid PDF file');
    }
  }

  // Upload resume and get the AI review
  uploadResumeForReview() {
    if (!this.resumeFile) {
      alert('Please select a PDF file');
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('resume', this.resumeFile, this.resumeFile.name);
    formData.append('customMessage', this.customMessage);  // Include custom message

    // Call service to upload the resume and get the AI review
    this.geminiAiService.sendResumeForReview(formData).subscribe(
      (data) => {
        // Assuming data is structured as:
        // { feedback: "Text feedback", suggestions: ["suggestion1", "suggestion2"], observations: "Other remarks" }
        this.resumeReview = data;
        this.isLoading = false;
      },
      (error) => {
        this.resumeReview = { feedback: 'There was an error processing your resume review request.' };
        this.isLoading = false;
        console.error('Error:', error);
      }
    );
  }
}
