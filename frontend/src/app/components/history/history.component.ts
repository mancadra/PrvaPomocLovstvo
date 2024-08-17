import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  quizzesHistory: any[] = [];

  constructor() {}

  ngOnInit() {
    this.loadQuizzesHistory();
  }

  loadQuizzesHistory() {
    const savedHistory = localStorage.getItem('quizzesHistory');
    if (savedHistory) {
      this.quizzesHistory = JSON.parse(savedHistory);
      console.log('Quizzes History:', this.quizzesHistory);
    }
  }

  correctAnswer(index: number, correct_answers: number[]): boolean {
    return correct_answers.includes(index);
  }
}
