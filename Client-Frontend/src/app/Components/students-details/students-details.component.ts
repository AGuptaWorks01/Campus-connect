import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../Student';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-students-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './students-details.component.html',
  styleUrl: './students-details.component.css'
})
export class StudentsDetailsComponent {
  student: Student = {
    name: '',
    department: '',
    year: '',
    image: '',
    company_name: '',
    employee: '',
    branch: '',
    degree: '',
    batch: '',
    stipend: '',
    user_id: 0
  };
  isEditing: boolean = false;
  selectedYear: string = '';

  constructor(
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Assuming you have some authentication service to get the logged-in user's ID
    const userId = 1; // Replace with the actual user ID from your authentication service
    this.student.user_id = userId;

    // Check if we are editing an existing student
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.isEditing = true;
      this.studentsService.getStudents().subscribe(students => {
        const student = students.find(s => s.user_id === userId); // Fetch the logged-in student's data
        if (student) {
          this.student = { ...student }; // Prefill the form with existing student data
        }
      });
    }
  }

  // Submit form (Add or Update)
  onSubmit(): void {
    if (this.isEditing) {
      this.studentsService.updateStudent(this.student.user_id, this.student).subscribe(() => {
        this.router.navigate(['/students']); // Redirect to student list or wherever needed
      });
    } else {
      this.studentsService.addStudent(this.student).subscribe(() => {
        this.router.navigate(['/students']); // Redirect after adding student
      });
    }
  }

  // Delete student
  onDelete(): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentsService.deleteStudent(this.student.user_id).subscribe(() => {
        this.router.navigate(['/students']); // Redirect to student list or homepage
      });
    }
  }
}