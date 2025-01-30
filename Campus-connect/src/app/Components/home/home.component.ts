import { CommonModule } from '@angular/common'; // To import common Angular functionalities like ngIf, ngFor
import { Component } from '@angular/core'; // To define a component
import { FormsModule } from '@angular/forms'; // To use Angular forms functionality (for two-way data binding)
import { StudentsService } from '../../services/students.service'; // Importing the StudentsService to fetch student data
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home', // Selector to define the custom tag for this component
  standalone: true, // Indicates that this component is standalone and does not need a module
  imports: [CommonModule, FormsModule, RouterModule], // Import necessary modules (CommonModule and FormsModule)
  templateUrl: './home.component.html', // Path to the HTML template for the component
  styleUrls: ['./home.component.css'], // Path to the CSS for the component styling
})
export class HomeComponent {
  // Variables for managing search query, selected department and year, and the student list
  searchQuery: string = '';
  selectedDepartment: string = '';
  selectedYear: string = '';
  student: any[] = []; // Array to hold student data

  // Injecting the StudentsService to interact with the backend
  constructor(private studentService: StudentsService) { }

  // ngOnInit lifecycle hook, which runs once the component is initialized
  ngOnInit(): void {
    this.fetchStudents(); // Fetch students as soon as the component loads
  }

  // Method to fetch students from the backend API
  fetchStudents() {
    // Calling the service's getStudents method to fetch data
    this.studentService.getStudents().subscribe({
      next: (data) => {
        // When data is successfully fetched, assign it to the student array
        // If the data doesn't have students, assign an empty array to avoid errors
        this.student = data?.students ?? [];
      },
      error: (err) => {
        // If there's an error fetching students, log the error and set the student array to empty
        console.error('Error fetching students: ', err);
        this.student = []; // Handle API error gracefully
      }
    });
  }

  // Method to filter students based on search query, selected department, and selected year
  filteredStudents() {
    return this.student.filter(
      (student) =>
        // Checking if the student's name includes the search query (case-insensitive)
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        // Filtering based on department, if a department is selected
        (this.selectedDepartment === '' || student.department === this.selectedDepartment) &&
        // Filtering based on year, if a year is selected
        (this.selectedYear === '' || student.year === this.selectedYear)
    );
  }
}
