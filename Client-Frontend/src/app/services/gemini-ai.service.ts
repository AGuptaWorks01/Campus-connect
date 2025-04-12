import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeminiAiService {
  private apiUrl = `${environment.baseUrl}/gemin`;

  constructor(private http: HttpClient) {}

  sendPromptToGemini(prompt: string): Observable<any> {
    const body = { prompt: prompt };
    return this.http.post<any>(`${this.apiUrl}/generate-content`, body);
  }

  // Method to send resume file for review
  sendResumeForReview(file: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload-resume`, file);
  }
}
