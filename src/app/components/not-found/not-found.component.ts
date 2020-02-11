import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class NotFoundComponent implements OnInit {
  currentUrl: string;

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
  }

  /**
   * Redirects to the last URL used.
   */
  goBack(): void {
    this.location.back();
  }

}
