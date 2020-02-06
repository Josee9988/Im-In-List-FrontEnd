import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ILista } from '../../shared/models/IListas.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: ILista;
  @Input() newElement: string;
  @ViewChild('newElementInput', { static: false }) newElementInput: ElementRef;
  public windowHeight: number;

  constructor() { }

  ngOnInit() {
    this.windowHeight = window.innerHeight / 1.4;

    // mock
    this.list = {
      id: 1,
      idUsuarioCreador: 5,
      titulo: '',
      descripcion: '',
      elementos: [{
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
      }]
    };
  }

  addElement(): void {
    if (this.newElement) { // if the element exists
      this.newElement.trim();
      this.list.elementos.push({
        order: this.list.elementos.length + 1,
        text: this.newElement,
        master: true,
      });
      this.newElement = '';
    }
    this.newElementInput.nativeElement.focus(); // add the focus again
  }

  deleteElement(order: number): void {
    this.list.elementos = this.list.elementos.filter(element => element.order !== order);
  }

  makeSlave(order: number): void {
    const futureSlave = this.list.elementos.find(elemento => elemento.order === order);
    if (futureSlave) {
      futureSlave.master = false;
    }
  }

  makeMaster(order: number): void {
    const futureMaster = this.list.elementos.find(elemento => elemento.order === order);
    if (futureMaster) {
      futureMaster.master = true;
    }
  }

  onSubmit(): void {
    console.log(this.list);

  }


  drop(event: CdkDragDrop<string[]>) {
    const aux = this.list.elementos[event.currentIndex].order;
    this.list.elementos[event.currentIndex].order = this.list.elementos[event.previousIndex].order;
    this.list.elementos[event.previousIndex].order = aux;
    moveItemInArray(this.list.elementos, event.previousIndex, event.currentIndex);

  }

}
