import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../Student';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-students-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './students-details.component.html',
  styleUrl: './students-details.component.css',
})
export class StudentsDetailsComponent implements OnInit {
  student: Student = {
    id: 0,
    name: '',
    branch: '',
    year: '',
    image: '',
    company_name: '',
    employee_type: '',
    linkedin: '',
    github: '',
    user_id: 0,
  };

  isEditing: boolean = false;
  userId: number = 0; // Replace with actual logged-in user ID
  years: number[] = [];

  constructor(
    private studentsService: StudentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = parseInt(this.authService.getUserId() || '0') // Dynamically get userId from AuthService
    this.student.user_id = this.userId;
    this.years = Array.from({ length: 11 }, (_, index) => 2015 + index); // Generate years from 2015 to 2025

    /// Check if user already has a student record
    this.studentsService.getStudents().subscribe((students) => {
      const existingStudent = students.find((s) => s.user_id === this.userId);
      if (existingStudent) {
        this.student = { ...existingStudent };
        this.isEditing = true;  // set isEditing to true if record exists
      }
    });
  }

  // Submit form (Add or Update)
  onSubmit(): void {
    if (this.isEditing) {
      this.studentsService
        .updateStudent(this.student.id!, this.student)
        .subscribe(() => {
          alert('Student updated successfully!');
          this.router.navigate(['/home']); // Redirect to student list or wherever needed
        });
    } else {
      this.studentsService.addStudent(this.student).subscribe(() => {
        alert('Student added successfully!');
        this.isEditing = true;
        this.router.navigate(['/home']); // Redirect after adding student
      });
    }
  }

  // Delete Student
  onDelete(): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentsService.deleteStudent(this.student.id!).subscribe(() => {
        alert('Student deleted successfully!');
        this.isEditing = false;
        this.student = {
          id:0,
          name: '',
          branch: '',
          year: '',
          image: '',
          company_name: '',
          employee_type: '',
          linkedin: '',
          github: '',
          user_id: this.userId,
        };
        this.router.navigate(['/home'])
      });
    }
  }
}
