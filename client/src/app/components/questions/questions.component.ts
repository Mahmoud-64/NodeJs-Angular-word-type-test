import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionsDataService } from 'src/app/data/services/questions-data/questions-data.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  wordsData: [] = [];
  AnsweredQuestionsPercentage = 0;
  constructor(
    public dialog: MatDialog,
    private questionsDataService: QuestionsDataService
  ) {}

  ngOnInit(): void {
    this.questionsDataService.wordsSubject.subscribe((wordsData) => {
      setTimeout(() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }, 250);
      this.wordsData = wordsData;
    });

    this.questionsDataService.answeredQuestionsCountSubject.subscribe(
      (count) => {
        this.AnsweredQuestionsPercentage = count * 10;
        if (this.AnsweredQuestionsPercentage == 100) {
          this.openDialog('20ms', '200ms');
        }
      }
    );

    this.questionsDataService.getWords();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  tryAgain() {
    this.questionsDataService.resetAll();
  }
}
