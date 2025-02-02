import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { RouterModule } from '@angular/router';
import { Student } from '../../Student';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  students: Student[] = []; // Ensure students is an array
  userId: string | null = ''; // Dynamically fetch logged-in user ID
  searchQuery: string = ''; // For filtering the students
  selectedYear: string = ''; // For filtering by year
  selectedBranch: string = ''; // For filtering by branch
  selectedEmployeeType: string = ''; // For filtering by employee type

  isLoading: boolean = true; // Add loading state
  errorMessage: string = '';

  constructor(
    private studentService: StudentsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Get logged-in user ID from AuthService
    this.fetchStudents();
  }

  // Fetch students from backend API
  fetchStudents() {
    this.studentService.getStudents().subscribe({
      next: (students: Student[]) => {
        this.students = students || []; // Safely assign the students
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching students:', err);
        this.errorMessage = 'Failed to load students';
        this.students = [];
        this.isLoading = false;
      },
    });
  }

  // Filter students based on search query, year, branch, and employee type
  filteredStudents(): Student[] {
    return this.students.filter(
      (student) =>
        student.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedYear === '' || student.year === this.selectedYear) &&
        (this.selectedBranch === '' ||
          student.branch === this.selectedBranch) &&
        (this.selectedEmployeeType === '' ||
          student.employee_type === this.selectedEmployeeType)
    );
  }
}
