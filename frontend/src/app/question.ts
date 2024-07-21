export interface Question {
  _id?: string;
  question_text: string;
  num_of_correct_answers: number;
  answers: string[];
  categoryId: number;
  correct_answers: number[];
}
