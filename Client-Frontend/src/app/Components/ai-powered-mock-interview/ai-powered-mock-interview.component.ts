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
  messages: { text: string, isUser: boolean }[] = []
  isLoading: boolean = false;
  

  constructor(private geminiAiService: GeminiAiService) { }

   getGeminiResponse() {
    if (!this.prompt.trim()) {
      this.response = 'Please enter a valid prompt.';
      return;
    }

     this.messages.push({ text: this.prompt, isUser: true })
     this.isLoading = true;

    this.geminiAiService.sendPromptToGemini(this.prompt).subscribe(
      (data) => {
        this.messages.push({ text: data.text, isUser: false });
        this.isLoading = false

        //clear the input field after submit
        this.prompt = '';
      },
      (error) => {
        this.response = 'There was an error processing your request.';
        this.isLoading = false;
        console.error('Error:', error);
      }
    );
  }




  ngOnInit(): void {
    this.loadJotFormAgent();
  }

  private loadJotFormAgent(): void {
    if (typeof window !== 'undefined' && window.AgentInitializer) {
      window.AgentInitializer.init({
        rootId: "JotformAgent-01950991653070f5b7889f0ced27e2ec1471",
        formID: "01950991653070f5b7889f0ced27e2ec1471",
        queryParams: ["skipWelcome=1", "maximizable=1"],
        domain: "https://www.jotform.com",
        isInitialOpen: false,
        isDraggable: false,
        background: "linear-gradient(180deg, #C8CEED 0%, #C8CEED 100%)",
        buttonBackgroundColor: "#0a1551",
        buttonIconColor: "#fff",
        variant: false,
        customizations: {
          greeting: "Yes",
          greetingMessage: "Hi! How can I assist you?",
          pulse: "Yes",
          position: "right"
        }
      });
    }
  }
}