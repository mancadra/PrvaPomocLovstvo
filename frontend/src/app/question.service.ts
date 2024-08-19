import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question';
import { signal } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private url = environment.apiUrl;
  questions: Question[] = [];

  constructor(private httpClient: HttpClient) {}

  getQuestions() {
    return this.httpClient.get<Question[]>(`${this.url}/kviz`);
  }

  getQuestion(id: string) {
    return this.httpClient.get<Question>(`${this.url}/kviz/${id}`);
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
