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
  percents: number = 0;
  intervals$: any;
  progress: string = '0';
  isClosed: boolean = false;
  public answerCorrect: boolean = false;
  constructor(private questionService: QuestionService) {}

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
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answerClicked(questionIx: number, option: any) {
    if (questionIx === this.questions.length) this.isClosed = true;
  }

  getPercents() {
    this.percents = (this.points * 100) / this.questions.length;
    return this.percents;
  }
}
