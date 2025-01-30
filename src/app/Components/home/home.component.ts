import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchQuery: string = '';
  selectedDepartment: string = '';
  selectedYear: string = '';

  students = [
    {
      name: 'Amit Sharma',
      department: 'CSE',
      year: '1st Year',
      image:
        'https://yt3.googleusercontent.com/70rOiQVQ3_yeLfg8ZkNOXDThGKSEGZJSKPgq8IKvkjoBBYJll0grKGYybWlPBmfR3V4ZoOqrBQk=s900-c-k-c0x00ffffff-no-rj',
      companyName: 'XYZ Corp',
      companyEmployee: 'John Doe',
      companyBranch: 'CSE',
      companyDegree: 'B.Tech',
      companyBatch: '2025',
      companyStipend: '1,00,000',
    },
    {
      name: 'Priya Verma',
      department: 'AI',
      year: '2nd Year',
      image:
        'https://yt3.googleusercontent.com/70rOiQVQ3_yeLfg8ZkNOXDThGKSEGZJSKPgq8IKvkjoBBYJll0grKGYybWlPBmfR3V4ZoOqrBQk=s900-c-k-c0x00ffffff-no-rj',
      companyName: 'TechSolutions',
      companyEmployee: 'Jane Smith',
      companyBranch: 'AI',
      companyDegree: 'B.Tech',
      companyBatch: '2024',
      companyStipend: '80,000',
    },
    {
      name: 'Rahul Mehta',
      department: 'ECE',
      year: '3rd Year',
      image:
        'https://yt3.googleusercontent.com/70rOiQVQ3_yeLfg8ZkNOXDThGKSEGZJSKPgq8IKvkjoBBYJll0grKGYybWlPBmfR3V4ZoOqrBQk=s900-c-k-c0x00ffffff-no-rj',
      companyName: 'InnoTech',
      companyEmployee: 'Mark Taylor',
      companyBranch: 'ECE',
      companyDegree: 'B.Tech',
      companyBatch: '2023',
      companyStipend: '90,000',
    },
    {
      name: 'Sneha Patel',
      department: 'DS',
      year: '4th Year',
      image:
        'https://yt3.googleusercontent.com/70rOiQVQ3_yeLfg8ZkNOXDThGKSEGZJSKPgq8IKvkjoBBYJll0grKGYybWlPBmfR3V4ZoOqrBQk=s900-c-k-c0x00ffffff-no-rj',
      companyName: 'DataWorks',
      companyEmployee: 'Alex Lee',
      companyBranch: 'DS',
      companyDegree: 'B.Tech',
      companyBatch: '2022',
      companyStipend: '1,20,000',
    },
  ];

  filteredStudents() {
    return this.students.filter(
      (student) =>
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedDepartment === '' ||
          student.department === this.selectedDepartment) &&
        (this.selectedYear === '' || student.year === this.selectedYear)
    );
  }
}
