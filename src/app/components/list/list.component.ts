import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: any = [];
  @Input() newElement: string;
  @ViewChild('newElementInput', { static: false }) newElementInput: ElementRef;
  public windowHeight: number;
  constructor() { }

  ngOnInit() {
    this.windowHeight = window.innerHeight / 1.4;

    // mock
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

  addElement(): void {
    if (this.newElement) { // if the element exisys
      this.newElement.trim();
      this.list.elements.push({
        order: this.list.elements.length + 1,
        text: this.newElement,
        master: true,
      });
      this.newElement = '';
    }
    this.newElementInput.nativeElement.focus(); // add the focus again
  }

  deleteElement(order: number): void {
    this.list.elements = this.list.elements.filter(element => element.order !== order);

  }

  onSubmit(): void {
    console.log(this.list);

  }

}
