import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ILista } from '../../shared/models/IListas.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarDisplayerService } from '../../shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';
import { IListElement } from 'src/app/shared/models/IListElements.interface';

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

  private titulo: FormControl;
  private descripcion: FormControl;
  private password: FormControl;

  private hasPassword: boolean;

  windowHeight: number;

  constructor(private errorSnackbarDisplayerService: SnackbarDisplayerService) {
    this.titulo = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);
    this.descripcion = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);

  }

  ngOnInit() {
    this.windowHeight = window.innerHeight / 1.75;

    // mock list
    this.list = {
      id: 1,
      idUsuarioCreador: 5,
      titulo: '',
      descripcion: '',
      elementos: [{
        order: 1,
        text: 'Lechugas',
        master: true,
        subTasks: []
      },
      {
        order: 2,
        text: 'Tomates',
        master: true,
        subTasks: [3, 4]
      },
      {
        order: 3,
        text: 'Plátanos',
        master: false,
        subTasks: []
      },
      {
        order: 4,
        text: 'Duweis',
        master: false,
        subTasks: []
      },
      {
        order: 5,
        text: 'Melocotones',
        master: true,
        subTasks: []
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
        subTasks: []
      });
      this.newElement = '';
    }
    this.newElementInput.nativeElement.focus(); // add the focus again
  }

  deleteElement(order: number): void {
    this.list.elementos = this.list.elementos.filter(element => element.order !== order);
  }

  makeSlave(order: number): void {
    if (order !== 1) {
      const futureSlave: IListElement = this.list.elementos.find(elemento => elemento.order === order);
      if (futureSlave) {
        futureSlave.master = false;
        for (let i = futureSlave.order - 2; i > 0; i--) {
          if (this.list.elementos[i].master) {
            this.list.elementos[i].subTasks.push(futureSlave.order);

          }


        }

        // remove all of his subtasks
        futureSlave.subTasks.forEach(subTaskOrder => {
          const slaveOfFutureSlave = this.list.elementos.find(elemento => elemento.order === subTaskOrder);
          slaveOfFutureSlave.master = true;
          slaveOfFutureSlave.subTasks = [];
        });
      }
    } else {
      this.errorSnackbarDisplayerService.openSnackBar('No puedes hacer un subelemento del primer elemento!', SnackBarErrorType.warning);
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
    this.list.descripcion = this.descripcion.value;
    if (this.titulo.valid && this.descripcion.valid) { // titulo and description ok
      if (this.hasPassword && this.password.valid) { // if it has a password and it's valid (OK)
        console.log(this.list);

      } else if (!this.hasPassword) { // if it has not a password (OK)
        console.log(this.list);

      } else { // has password but it is not valid
        this.errorSnackbarDisplayerService.openSnackBar('La contraseña no es válida', SnackBarErrorType.error);
      }
    } else { // titulo and description not ok
      this.errorSnackbarDisplayerService.openSnackBar('El título o descripción no son válidos', SnackBarErrorType.error);
    }
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

  getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? 'Debes introducir una contraseña' :
      this.password.hasError('minlength') ? 'Debes de introducir una contraseña con al menos 4 carácteres.' :
        '';
  }


}
