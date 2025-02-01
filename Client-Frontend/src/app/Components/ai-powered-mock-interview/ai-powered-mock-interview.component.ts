import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-powered-mock-interview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-powered-mock-interview.component.html',
  styleUrl: './ai-powered-mock-interview.component.css'
})
export class AiPoweredMockInterviewComponent {
 // Sample interview questions
  questions = [
    {
      question: 'What is Angular?',
      options: ['A programming language', 'A framework', 'A database', 'A library'],
      correctAnswer: 'A framework'
    },
    {
      question: 'What is two-way data binding in Angular?',
      options: ['Binding data from component to template', 'Binding data from template to component', 'Binding data between two components', 'Both a and b'],
      correctAnswer: 'Both a and b'
    },
    {
      question: 'Which directive is used for iteration in Angular?',
      options: ['ngFor', 'ngIf', 'ngModel', 'ngSwitch'],
      correctAnswer: 'ngFor'
    },
  ];

  questionIndex = 0;
  correctAnswers = 0;

  submitAnswer(answer: string) {
    if (answer === this.questions[this.questionIndex].correctAnswer) {
      this.correctAnswers++;
    }
    this.questionIndex++;
  }

  restartInterview() {
    this.questionIndex = 0;
    this.correctAnswers = 0;
  }
}