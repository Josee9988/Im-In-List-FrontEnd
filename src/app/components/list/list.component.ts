import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ILista } from '../../shared/models/IListas.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarDisplayerService } from '../../shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';
import { IListElement } from 'src/app/shared/models/IListElements.interface';
import { Forms } from 'src/app/shared/classes/Forms.class';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class ListComponent extends Forms implements OnInit {
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
    super();
    this.titulo = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);
    this.descripcion = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  }

  ngOnInit() {
    this.windowHeight = window.innerHeight / 2.5;

    // mock list
    this.list = {
      id: 1,
      idUsuarioCreador: 5,
      titulo: '',
      descripcion: '',
      elementos: [{
        order: 0,
        text: 'Lechugas',
        master: true,
        subTasks: []
      },
      {
        order: 1,
        text: 'Tomates',
        master: true,
        subTasks: ['SubTomates1', 'SubTomates2']
      },
      {
        order: 2,
        text: 'Melocotones',
        master: true,
        subTasks: []
      }, {
        order: 3,
        text: 'Macarrones verdes',
        master: true,
        subTasks: ['FlamaMóvilesVerdes']
      }]
    };
  }

  /**
   * Summary: receives an element and adds it to the element list.
   */
  onAddElement(): void {
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

  /**
   * Summary: receives an order number (id - like) of an element and deletes it.
   *
   * @param order the order number of the element that we want to delete.
   */
  onDeleteElementMaster(order: number): void {
    this.list.elementos = this.list.elementos.filter(element => element.order !== order);
  }

  onDeleteSlave(text: string): void {
    this.list.elementos.forEach(element => {
      element.subTasks.splice(element.subTasks.indexOf(text), 1);
    });
  }


  /**
   * Summary: receives an order number (id - like) of an master element and turns it
   * into a slave element.
   *
   * @param order the order number of the element that we want to make slave.
   */
  onMakeSlave(order: number): void {
    if (this.list.elementos[0].order !== order) {
      const futureSlave = this.list.elementos.find(elemento => elemento.order === order);
      if (futureSlave) {
        futureSlave.master = false;
        for (let i = futureSlave.order; i >= 0; i--) { // asign the master of the futureSlave
          if (typeof this.list.elementos[i] !== 'undefined' && this.list.elementos[i].master) {
            this.list.elementos[i].subTasks.push(futureSlave.order);
            break;
          }
        }
        // foreach every subtask, and make them master (they are freed from the master)
        futureSlave.subTasks.forEach(subTaskOrder => {
          const slaveOfFutureSlave = this.list.elementos.find(elemento => elemento.order === subTaskOrder);
          slaveOfFutureSlave.master = true;
        });
        futureSlave.subTasks = []; // remove the subtasks of the future slave
        this.forceRefresh(); // FORCE LIST REFRESH
      }
    } else {
      this.errorSnackbarDisplayerService.openSnackBar('No puedes hacer un subelemento del primer elemento!', SnackBarErrorType.warning);
    }
  }

  /**
   * Summary: receives an order number (id - like) of an subelement/slave element and turns it
   * into a master element.
   *
   * @param order the order number of the element that we want to make master.
   */
  onMakeMaster(order: number): void {
    const futureMaster: IListElement = this.list.elementos.find(elemento => elemento.order === order);
    if (futureMaster) {
      futureMaster.master = true;
      for (const element of this.list.elementos) {
        if (element.subTasks.find(o => o === futureMaster.order)) {
          const index = element.subTasks.indexOf(futureMaster.order);
          if (index > -1) {
            element.subTasks.splice(index, 1);
          }
        }
      }
      this.forceRefresh(); // FORCE LIST REFRESH
    }
  }

  onSubmit(): void {
    console.log(this.list.elementos);

    if (this.hasPassword) {
      this.inputs = [this.titulo, this.descripcion, this.password];
    } else {
      this.inputs = [this.titulo, this.descripcion];
    }
    this.list.titulo = this.titulo.value;
    this.list.descripcion = this.descripcion.value;
    if (super.validateInputs()) { // IF THE INPUTS ARE VALID
      // TODO: SEND THE LIST
      super.clearInputs();
    } else { // IF ANY INPUT IS NOT READY
      this.errorSnackbarDisplayerService.openSnackBar('Valores incorrectos', SnackBarErrorType.warning);
    }
  }

  /**
   * Summary: resets the list, so the angular view gets refreshed.
   */
  forceRefresh(): void {
    const fake = this.list;
    this.list = null;
    setTimeout(() => this.list = fake);
  }

  /**
   * Summary: receives a drag event and switches positions and reflects it in the main array.
   *
   * @param event the event received to switch two element positions.
   */
  onDrop(event: CdkDragDrop<string[]>): void {
    const aux = this.list.elementos[event.currentIndex].order;
    this.list.elementos[event.currentIndex].order = this.list.elementos[event.previousIndex].order;
    this.list.elementos[event.previousIndex].order = aux;
    moveItemInArray(this.list.elementos, event.previousIndex, event.currentIndex);
    let orderCounter = 0;
    for (let i = 0; i < this.list.elementos.length; i++) {
      this.list.elementos[i].order = orderCounter;
      orderCounter++;

      if (this.list.elementos[i].subTasks.length > 0) { // if it has subtasks
        for (let j = 0; j < this.list.elementos[i].subTasks.length; j++) {
          this.list.elementos[i].subTasks[j] = orderCounter + j;

        }
      }
    }

    const movedSubTaks = this.list.elementos[event.currentIndex].subTasks.length;
    if (movedSubTaks > 0) {
      moveItemInArray(this.list.elementos, event.previousIndex, movedSubTaks + 1);
    }


    let counter = 0;
    this.list.elementos.forEach(element => {
      element.order = counter;
      // TODO: change order of subelements
      counter++;
    });

    console.log(this.list.elementos);
  }

  /**
   * Summary: checks if the input has any error, and if that is the case it will return a string
   * with the problem, if there is no error it will simply return an empty string.
   *
   * @return string of the first error found.
   */
  getTituloErrorMessage(): string {
    return this.titulo.hasError('required') ? 'Debes introducir un titulo' :
      this.titulo.hasError('minlength') ? 'Debes de introducir un titulo con al menos 4 carácteres.' :
        this.titulo.hasError('maxLength') ? 'Debes de introducir un titulo con menos de 60 carácteres.' :
          '';
  }

  /**
   * Summary: checks if the input has any error, and if that is the case it will return a string
   * with the problem, if there is no error it will simply return an empty string.
   *
   * @return string of the first error found.
   */
  getDescripcionErrorMessage(): string {
    return this.descripcion.hasError('required') ? 'Debes introducir una descripción' :
      this.descripcion.hasError('minlength') ? 'Debes de introducir una descripción con al menos 4 carácteres.' :
        this.descripcion.hasError('maxLength') ? 'Debes de introducir una descripción con menos de 60 carácteres.' :
          '';
  }

  /**
   * Summary: checks if the input has any error, and if that is the case it will return a string
   * with the problem, if there is no error it will simply return an empty string.
   *
   * @return string of the first error found.
   */
  getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? 'Debes introducir una contraseña' :
      this.password.hasError('minlength') ? 'Debes de introducir una contraseña con al menos 4 carácteres.' :
        '';
  }
}
