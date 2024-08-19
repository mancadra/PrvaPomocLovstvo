import { Component, OnInit} from '@angular/core';
import { Question } from '../../question';
import { QuestionService } from '../../question.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChangeBgModule } from '../../change-bg.module';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    NgIf,
    CommonModule,
    ChangeBgModule,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  allQuestions: Question[] = [];
  questions: Question[] = [];
  quizHistory: any[] = [];
  quizzesHistory: any[] = [];
  selectedAnswers: any[] = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  correctAnswers: number = 0;
  inCorrectAnswer: number = 0;
  public percents: number = 0;
  quizLength: number = 20;
  intervals$: any;
  progress: string = '0';
  isClosed: boolean = false;
  showHistory: boolean = false;
  currentQuestionPoints: number = 0;
  public nrCorrectAnswers = 0; // meant for the querstions with multiple choices
  constructor(
    private questionService: QuestionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.questionService.getQuestions().subscribe((questions) => {
      this.allQuestions = questions;
      this.questions = [];

      let i: number = 0;
      let selectedElements: number[] = [];
      while (
        i < this.quizLength &&
        selectedElements.length < this.allQuestions.length
      ) {
        const randIx: number = Math.floor(
          Math.random() * this.allQuestions.length
        );
        if (!selectedElements.includes(randIx)) {
          selectedElements.push(randIx);
          i++;
          this.questions.push(this.allQuestions[randIx]);
        }
      }
      i = 0;
      selectedElements = [];
    });
  }

  deleteQuestion(id: string): void {
    this.questionService.deleteQuestion(id).subscribe({
      next: () => this.fetchQuestions(),
    });
  }

  private fetchQuestions(): void {
    this.questionService.getQuestions().subscribe((questions) => {
      this.questions = questions;
    });
  }

  nextQuestion() {
    if (this.isCorrectAnswer(this.questions[this.currentQuestion].correct_answers)) {
      this.points++;
      this.currentQuestionPoints = 1;
      this.correctAnswers++;
      this.percents = (this.points * 100) / this.questions.length;
      this.percents = parseFloat(this.percents.toFixed(2))   ;
    }
    this.setQuestionHistory(this.currentQuestion, this.selectedAnswers);
    if (this.currentQuestion + 1 === this.questions.length) {
      this.saveQuizHistory();
      this.isClosed = true;
    }
    this.currentQuestionPoints = 0;
    this.selectedAnswers = [];
    this.currentQuestion++;
    this.nrCorrectAnswers = 0;
  }

  previousQuestion() {
    if (
      this.nrCorrectAnswers ==
      this.questions[this.currentQuestion].num_of_correct_answers
    ) {
      this.points++;
      this.correctAnswers++;
    }
    this.currentQuestion--;
    this.nrCorrectAnswers = 0;
  }

  answerClicked(option: any) {
    const index = this.selectedAnswers.indexOf(option);

    if (index === -1) {
      this.selectedAnswers.push(option);
    } else {
      this.selectedAnswers.splice(index, 1);
    }
  }

  resetQuiz() {
    this.currentQuestion = 0;
    this.points = 0;
    this.correctAnswers = 0;
    this.inCorrectAnswer = 0;
    this.percents = 0;
    this.progress = '0';
    this.nrCorrectAnswers = 0; // meant for the questions with multiple choices
    this.quizHistory = [];
    this.showHistory = false;
    this.selectedAnswers = [];
  }

  correctAnswer(index: number, correct_answers: number[]) {
    if (correct_answers.includes(index)) {
      return true;
    }
    return false;
  }

  isCorrectAnswer(correct_answers: number[]) {
    if (this.selectedAnswers.length != correct_answers.length) return false;
    for (let i = 0; i < this.selectedAnswers.length; i++) {
      if (!correct_answers.includes(this.selectedAnswers[i])) return false;
    }
    return true;
  }

  setQuestionHistory(ix: number, selectedOption: any) {
    const questionHistory = {
      question_text: this.questions[ix].question_text,
      selected_answers: selectedOption,
      answers: this.questions[ix].answers,
      correct_answers: this.questions[ix].correct_answers,
      question_points: this.currentQuestionPoints,
    };
    this.quizHistory[ix] = questionHistory;
  }

  getDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${day}. ${month}. ${year}`;
    return formattedDate;
  }

  saveQuizHistory() {
    //localStorage.removeItem('quizzesHistory');
    localStorage.setItem('quizHistory', JSON.stringify(this.quizHistory));

    const fullQuizHistory = {
      quiz: this.quizHistory,
      points: this.points,
      percents: this.percents,
      date: this.getDate(),
    };

    const existingHistory = localStorage.getItem('quizzesHistory');
    let quizzesHistory = existingHistory ? JSON.parse(existingHistory) : [];
    quizzesHistory.push(fullQuizHistory);
    localStorage.setItem('quizzesHistory', JSON.stringify(quizzesHistory));
  }

  showQuizHistory() {
    this.showHistory = true;
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      this.quizHistory = JSON.parse(savedHistory);
    }
  }

  showQuizzesHistory() {
    const savedHistory = localStorage.getItem('quizzesHistory');
    if (savedHistory) {
      this.quizzesHistory = JSON.parse(savedHistory);
    }
  }
}
