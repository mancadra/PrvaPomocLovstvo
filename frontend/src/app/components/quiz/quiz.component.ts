import { Component, OnInit, WritableSignal } from '@angular/core';
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
  quizLength: number = 3;
  intervals$: any;
  progress: string = '0';
  isClosed: boolean = false;
  showHistory: boolean = false;
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
      console.log('Questions: ', this.questions.length, this.questions);
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
    this.setQuestionHistory(this.currentQuestion, this.selectedAnswers);
    if (this.currentQuestion + 1 === this.questions.length) {
      this.saveQuizHistory();
      this.percents = (this.points * 100) / this.questions.length;
      this.isClosed = true;
    }
    if (
      this.nrCorrectAnswers ==
      this.questions[this.currentQuestion].num_of_correct_answers
    ) {
      console.log('Moved to another question');
      this.points++;
      this.correctAnswers++;
    }
    this.selectedAnswers = [];
    this.currentQuestion++;
    this.nrCorrectAnswers = 0;
    console.log(this.points);
  }

  previousQuestion() {
    if (
      this.nrCorrectAnswers ==
      this.questions[this.currentQuestion].num_of_correct_answers
    ) {
      console.log('Moved to another question');
      this.points++;
      this.correctAnswers++;
    }
    this.currentQuestion--;
    this.nrCorrectAnswers = 0;
    console.log(this.points);
  }

  answerClicked(option: any) {
    this.selectedAnswers.push(option);
    if (this.questions[this.currentQuestion].correct_answers.includes(option)) {
      this.nrCorrectAnswers++;
      console.log(this.nrCorrectAnswers);
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
    console.log('Correct answers: ', correct_answers);
    if (correct_answers.includes(index)) {
      console.log('TRue');
      return true;
    }
    console.log('FAlse');
    return false;
  }

  setQuestionHistory(ix: number, selectedOption: any) {
    const questionHistory = {
      question_text: this.questions[ix].question_text,
      selected_answers: selectedOption,
      answers: this.questions[ix].answers,
      correct_answers: this.questions[ix].correct_answers,
    };
    console.log('QuestionHistory: ', questionHistory);
    this.quizHistory[ix] = questionHistory;
  }

  saveQuizHistory() {
    localStorage.setItem('quizHistory', JSON.stringify(this.quizHistory));

    const existingHistory = localStorage.getItem('quizzesHistory');
    let quizzesHistory = existingHistory ? JSON.parse(existingHistory) : [];
    quizzesHistory.push(this.quizHistory);
    localStorage.setItem('quizzesHistory', JSON.stringify(quizzesHistory));
  }

  showQuizHistory() {
    this.showHistory = true;
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      this.quizHistory = JSON.parse(savedHistory);
      console.log('Quiz History:', this.quizHistory);
    }
  }

  showQuizzesHistory() {
    const savedHistory = localStorage.getItem('quizzesHistory');
    if (savedHistory) {
      this.quizzesHistory = JSON.parse(savedHistory);
      console.log('Quizzes History:', this.quizzesHistory);
    }
  }
}
