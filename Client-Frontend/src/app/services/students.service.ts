import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../Student';
import { map } from 'rxjs/operators';

// If the backend returns a response object that contains a 'students' property
interface StudentsResponse {
  students: Student[]; // The API response will have a 'students' array
}

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private apiUrl = 'http://localhost:3100/api/students/'; // API URL for student data

  constructor(private http: HttpClient) {}


  // Get all students
  getStudents(): Observable<Student[]> {
    // Handling the wrapped response (students inside the 'students' field)
    return this.http.get<StudentsResponse>(`${this.apiUrl}getall`).pipe(
      map((response: { students: any; }) => response.students) // Extract the 'students' array from the response
    );
  }

  // Add a new student
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}add`, student);
  }

  // Update an existing student
  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}update/${id}`, student);
  }

  // Delete a student
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}delete/${id}`);
  }
}
