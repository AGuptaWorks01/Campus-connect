import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeminiAiService {
  private apiUrl = 'http://localhost:3100/api/gemini'; // Backend API URL

  constructor(private http: HttpClient) { }

  sendPromptToGemini(prompt: string): Observable<any> {
    const body = { prompt: prompt };
    return this.http.post<any>(`${this.apiUrl}/generate-content`, body);
  }

  // Method to send resume file for review
  sendResumeForReview(file: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload-resume`, file);
  }
}
