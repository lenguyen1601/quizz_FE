import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  categories = [
    {
      cid: 23,
      title: 'Lap trinh java tuoi30',
    },
    {
      cid: 23,
      title: 'Lap trinh java tuoi30',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}