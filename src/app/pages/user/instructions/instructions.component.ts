import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  qid;
  quiz;

  constructor(private _router: ActivatedRoute, private _quiz: QuizService) {}

  ngOnInit(): void {
    this.qid = this._router.snapshot.params.qid;
    // console.log(this.qid);

    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        console.log(data);
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        alert('Error in loading quizz data');
      }
    );
  }
}
