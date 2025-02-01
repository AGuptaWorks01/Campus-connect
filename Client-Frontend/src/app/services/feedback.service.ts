import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/feedbacks'; // Backend API URL

  postFeedback(feedbackData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, feedbackData);
  }

  getAllFeedback(): Observable<any>{
    return this.http.get<any>(this.apiUrl)
  }
}
