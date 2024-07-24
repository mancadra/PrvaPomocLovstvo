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
  questions: Question[] = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  correctAnswers: number = 0;
  inCorrectAnswer: number = 0;
  public percents: number = 0;
  intervals$: any;
  progress: string = '0';
  isClosed: boolean = false;
  public nrCorrectAnswers = 0; // meant for the querstions with multiple choices
  constructor(private questionService: QuestionService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.questionService.getQuestions().subscribe((questions) => {
      this.questions = questions;
      console.log(questions);
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
    if (this.currentQuestion === this.questions.length) {
      this.percents = (this.points * 100) / this.questions.length;
      this.isClosed = true;
      this.cdr.detectChanges();
    }
    if (this.nrCorrectAnswers == this.questions[this.currentQuestion].num_of_correct_answers) {
      console.log("Moved to another question", )
      this.points++;
      this.correctAnswers++;
    }
    this.currentQuestion++;
    this.nrCorrectAnswers = 0;
    console.log(this.points)
  }

  previousQuestion() {
    if (this.nrCorrectAnswers == this.questions[this.currentQuestion].num_of_correct_answers) {
      console.log("Moved to another question", )
      this.points++;
      this.correctAnswers++;
    }
    this.currentQuestion--;
    this.nrCorrectAnswers = 0;
    console.log(this.points)
  }

  answerClicked(answerIx: number, option: any) {
    if (this.questions[this.currentQuestion].correct_answers.includes(option)) {
      this.nrCorrectAnswers++;
      console.log(this.nrCorrectAnswers)
    }
  }

  resetQuiz() {
    this.currentQuestion = 0;
    this.points = 0;
    this.correctAnswers = 0;
    this.inCorrectAnswer = 0;
    this.percents = 0;
    this.progress = '0';
    this.nrCorrectAnswers = 0; // meant for the querstions with multiple choices
  }

  detectChanges() {
    this.cdr.detectChanges();
  }
}
