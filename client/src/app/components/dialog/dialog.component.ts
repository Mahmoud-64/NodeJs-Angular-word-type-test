import { Component, OnInit } from '@angular/core';
import { QuestionsDataService } from 'src/app/data/services/questions-data/questions-data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  rank: number = 0;
  score: number = 0;
  constructor(private questionsDataService: QuestionsDataService) {}

  ngOnInit(): void {
    this.questionsDataService.getRank().subscribe((rank) => {
      this.rank = rank;
    });
    this.score = this.questionsDataService.score;
  }

  tryAgain() {
    this.questionsDataService.resetAll();
  }
}
