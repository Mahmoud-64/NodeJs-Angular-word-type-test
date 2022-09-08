import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const backendUrl = environment.backendUrl;
interface word {
  id: number;
  word: String;
  pos: String;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsDataService {
  words: Array<word> = [];
  wordsSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  answeredQuestionsCount: number = 0;
  answeredQuestionsCountSubject: BehaviorSubject<number> = new BehaviorSubject(
    0
  );
  resetAllSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  score: number = 0;
  constructor(private http: HttpClient) {}

  getWords() {
    return this.http
      .get<Array<word>>(backendUrl + '/words')
      .subscribe((res) => {
        this.words = res;
        this.wordsSubject.next(this.words);
      });
  }

  getRank() {
    return this.http.post<number>(backendUrl + '/rank', { score: this.score });
  }

  submitCorrectAnswer() {
    this.incrementAnswersCounters();
    this.score += 10;
  }

  submitWrongAnswer() {
    this.incrementAnswersCounters();
  }

  incrementAnswersCounters() {
    this.answeredQuestionsCount++;
    this.answeredQuestionsCountSubject.next(this.answeredQuestionsCount);
  }

  resetAll() {
    this.wordsSubject.next([]);
    this.answeredQuestionsCount = 0;
    this.score = 0;
    this.answeredQuestionsCountSubject.next(0);
    this.getWords();
  }
}
