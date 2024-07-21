import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private url = 'http://localhost:5200';
  questions$ = signal<Question[]>([]);
  question$ = signal<Question>({} as Question);

  constructor(private httpClient: HttpClient) {}

  private refreshQuestions() {
    this.httpClient
      .get<Question[]>(`${this.url}/kviz`)
      .subscribe((questions) => {
        this.questions$.set(questions);
      });
  }

  getQuestions() {
    this.refreshQuestions();
    return this.questions$();
  }

  getQuestion(id: string) {
    this.httpClient
      .get<Question>(`${this.url}/kviz/${id}`)
      .subscribe((question) => {
        this.question$.set(question);
        return this.question$();
      });
  }

  createQuestion(question: Question) {
    return this.httpClient.post(`${this.url}/kviz`, question, {
      responseType: 'text',
    });
  }

  updateQuestion(id: string, question: Question) {
    return this.httpClient.put(`${this.url}/kviz/${id}`, question, {
      responseType: 'text',
    });
  }

  deleteQuestion(id: string) {
    return this.httpClient.delete(`${this.url}/kviz/${id}`, {
      responseType: 'text',
    });
  }
}
