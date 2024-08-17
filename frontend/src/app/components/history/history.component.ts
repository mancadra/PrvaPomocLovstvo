import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  quizzesHistory: any[] = [];
  availableLocalHistory: boolean = true;

  constructor() {}

  ngOnInit() {
    this.loadQuizzesHistory();
  }

  loadQuizzesHistory() {
    if (typeof localStorage !== 'undefined') {
      this.availableLocalHistory = true;
      const savedHistory = localStorage.getItem('quizzesHistory');
      if (savedHistory) {
        this.quizzesHistory = JSON.parse(savedHistory);
        console.log('Quizzes History:', this.quizzesHistory);
      } else {
        this.availableLocalHistory = false;
      }
    } else {
      this.availableLocalHistory = false;
      console.warn('localStorage is not available.');
    }

  }

  correctAnswer(index: number, correct_answers: number[]): boolean {
    return correct_answers.includes(index);
  }
}
