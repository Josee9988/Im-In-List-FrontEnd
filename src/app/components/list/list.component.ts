import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ILista } from '../../shared/models/IListas.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: ILista;
  @Input() newElement: string;

  @ViewChild('newElementInput', { static: false }) newElementInput: ElementRef;
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  titulo: FormControl;
  descripcion: FormControl;

  public windowHeight: number;

  constructor() {
    this.titulo = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);
    this.descripcion = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);

  }

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
    this.list.titulo = this.titulo.value;
    console.log(this.list);

  }


  drop(event: CdkDragDrop<string[]>) {
    const aux = this.list.elementos[event.currentIndex].order;
    this.list.elementos[event.currentIndex].order = this.list.elementos[event.previousIndex].order;
    this.list.elementos[event.previousIndex].order = aux;
    moveItemInArray(this.list.elementos, event.previousIndex, event.currentIndex);

  }

  getTituloErrorMessage(): string {
    return this.titulo.hasError('required') ? 'Debes introducir un titulo' :
      this.titulo.hasError('minlength') ? 'Debes de introducir un titulo con al menos 4 carácteres.' :
        this.titulo.hasError('maxLength') ? 'Debes de introducir un titulo con menos de 60 carácteres.' :
          '';
  }

  getDescripcionErrorMessage(): string {
    return this.descripcion.hasError('required') ? 'Debes introducir una descripción' :
      this.descripcion.hasError('minlength') ? 'Debes de introducir una descripción con al menos 4 carácteres.' :
        this.descripcion.hasError('maxLength') ? 'Debes de introducir una descripción con menos de 60 carácteres.' :
          '';
  }

}
