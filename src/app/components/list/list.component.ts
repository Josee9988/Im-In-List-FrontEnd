import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: any = [];
  constructor() { }

  ngOnInit() {
    this.list.elements = [{
      order: 1,
      text: 'Lechugas',
      master: true,
    },
    {
      order: 2,
      text: 'Tomates',
      master: true,
    },
    {
      order: 3,
      text: 'Plátanos',
      master: false,
    },
    {
      order: 4,
      text: 'Duweis',
      master: true,
    }];
  }

  addElement(element: any): void {
    console.log(element);

  }

}
