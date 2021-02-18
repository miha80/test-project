import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  search: FormControl;
  item = {
    title: 'title',
    description: 'This guide explains how to set up your Angular project to begin using Angular Material. It includes information on prerequisites, installing Angular Material, and optionally displaying a sample material component in your application to verify your setup.',
    isFavorite: true,
  }

  constructor() {
    this.search = new FormControl();
  }

  ngOnInit(): void {
  }

}
