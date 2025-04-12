import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../Student';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private apiUrl = `${environment.baseUrl}/students/`; // API URL for student data

  constructor() {}

  // Get all students
  getStudents(): Observable<Student[]> {
    return this.http
      .get<{ students: Student[] }>(`${this.apiUrl}getall`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.getAuthToken()}`, // Correct Header
        }),
      })
      .pipe(map((response) => response.students)); // Extract the 'students' array
  }

  // Add a new student
  addStudent(formData: FormData): Observable<Student> {
    // console.log("Adding Student:", student); // Debugging
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http.post<Student>(`${this.apiUrl}add`, formData, {
      headers, // Add Authorization header
    });
  }

  // Update a student (using Student ID)
  updateStudent(studentId: number, formData: FormData): Observable<Student> {
    console.log('Updating Student ID:', studentId); // Debugging

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`, // Correct Header
    });

    return this.http.put<Student>(
      `${this.apiUrl}update/${studentId}`,
      formData,
      { headers }
    );
  }

  // Delete a student
  deleteStudent(studentId: number): Observable<void> {
    console.log('Deleting Student ID:', studentId); // Debugging

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`, // Correct Header
    });

    return this.http.delete<void>(`${this.apiUrl}delete/${studentId}`, {
      headers,
    });
  }
}
