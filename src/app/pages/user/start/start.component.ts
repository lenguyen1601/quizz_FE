import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid;
  questions;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;

        this.questions.forEach((q) => {
          q['givenAnswer'] = '';
        });

        console.log(this.questions);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        //calculation
        this.isSubmit = true;

        this.questions.forEach((q) => {
          if (q.givenAnswer == q.answer) {
            this.correctAnswers++;
            let marksSingle =
              this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot += marksSingle;
          }

          if (q.givenAnswer.trim() != '') {
            this.attempted++;
          }
        });

        console.log('Correct answers' + this.correctAnswers);
        console.log('Marks got' + this.marksGot);
        console.log('attempted' + this.attempted);
        console.log(this.questions);
      }
    });
  }
}
