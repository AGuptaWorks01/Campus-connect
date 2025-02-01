// Import necessary Angular modules and libraries
import { HttpClient } from '@angular/common/http'; // To make HTTP requests
import { Injectable } from '@angular/core'; // To make the service injectable
import { Observable } from 'rxjs'; // To use Observable for handling asynchronous operations

@Injectable({
  providedIn: 'root' // This makes the service available globally in the app
})
export class StudentsService {
  // The URL of the API endpoint to fetch student data
  private apiUrl = 'http://localhost:3000/api/students/students';

  // Constructor where we inject the HttpClient service to be used for HTTP requests
  constructor(private http: HttpClient) { }

  // This method fetches the list of students from the API
  getStudents(): Observable<any> {
    // Performing a GET request to the API and returning the observable of the response
    return this.http.get<any>(this.apiUrl);
  }
}
