import { Component, OnInit, WritableSignal } from '@angular/core';
import { Question } from '../../question';
import { QuestionService } from '../../question.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  questions$ = {} as WritableSignal<Question[]>;
  displayedColumns: string[] = [
    'col-question-text',
    'col-nr-correct-answers',
    'col-answers',
    'col-category',
    'col-correct-answers',
    'col-action',
  ];

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.fetchQuestions();
  }

  deleteQuestion(id: string): void {
    this.questionService.deleteQuestion(id).subscribe({
      next: () => this.fetchQuestions(),
    });
  }

  private fetchQuestions(): void {
    this.questions$ = this.questionService.questions$;
    this.questionService.getQuestions();
  }
}
