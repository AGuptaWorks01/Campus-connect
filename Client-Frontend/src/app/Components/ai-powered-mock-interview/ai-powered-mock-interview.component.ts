import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiAiService } from '../../services/gemini-ai.service';

@Component({
  selector: 'app-ai-powered-mock-interview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-powered-mock-interview.component.html',
  styleUrl: './ai-powered-mock-interview.component.css'
})
export class AiPoweredMockInterviewComponent {
  prompt: string = '';
  response: string | null = null;

  constructor(private geminiAiService: GeminiAiService) { }

   getGeminiResponse() {
    if (!this.prompt.trim()) {
      this.response = 'Please enter a valid prompt.';
      return;
    }

    this.geminiAiService.sendPromptToGemini(this.prompt).subscribe(
      (data) => {
        this.response = data.text;
      },
      (error) => {
        this.response = 'There was an error processing your request.';
        console.error('Error:', error);
      }
    );
  }
}