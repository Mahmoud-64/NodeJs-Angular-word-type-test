import { Component, Input, OnInit } from '@angular/core';
import { QuestionsDataService } from 'src/app/data/services/questions-data/questions-data.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
  @Input() wordData: { id: number; word: String; pos: String } = {
    id: 0,
    word: '',
    pos: '',
  };
  isAnswerSubmitted: Boolean = false;
  isAnswerCorrect: Boolean = false;
  chosenAnswer: String = '';
  constructor(private questionsDataService: QuestionsDataService) {}

  ngOnInit(): void {
    this.isAnswerSubmitted = false;
  }

  submitAnswer(type: String) {
    this.isAnswerSubmitted = true;
    this.chosenAnswer = type;
    this.isAnswerCorrect = (this.chosenAnswer == this.wordData.pos);
    if(this.isAnswerCorrect){
      this.questionsDataService.submitCorrectAnswer()
    }else
    this.questionsDataService.submitWrongAnswer()
  }
}
