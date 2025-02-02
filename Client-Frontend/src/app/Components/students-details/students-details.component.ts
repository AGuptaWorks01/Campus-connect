import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../Student';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-students-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './students-details.component.html',
  styleUrl: './students-details.component.css',
})
export class StudentsDetailsComponent {
  student: Student = {
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
  userId: number = 1; // Replace with actual logged-in user ID
  selectedYear: string = '';

  constructor(
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.student.user_id = this.userId;

    /// Check if user already has a student record
    this.studentsService.getStudents().subscribe((students) => {
      const existingStudent = students.find((s) => s.user_id === this.userId);
      if (existingStudent) {
        this.student = { ...existingStudent };
        this.isEditing = true;
      }
    });
  }

  // Submit form (Add or Update)
  onSubmit(): void {
    if (this.isEditing) {
      this.studentsService
        .updateStudent(this.student.user_id, this.student)
        .subscribe(() => {
          alert('Student updated successfully!');
          this.router.navigate(['/students']); // Redirect to student list or wherever needed
        });
    } else {
      this.studentsService.addStudent(this.student).subscribe(() => {
        this.router.navigate(['/students']); // Redirect after adding student
        this.isEditing = true;
      });
    }
  }

  // Delete Student
  onDelete(): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentsService.deleteStudent(this.student.user_id).subscribe(() => {
        alert('Student deleted successfully!');
        this.isEditing = false;
        this.student = {
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
      });
    }
  }
}
