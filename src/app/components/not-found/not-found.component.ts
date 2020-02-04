import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  currentUrl: string;

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
  }

  goBack(): void {
    this.location.back();
  }

}
