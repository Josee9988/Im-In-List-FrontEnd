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
        subTasks: [{ name: 'SubTomates1' }, { name: 'SubTomates2' }]
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
        subTasks: [{ name: 'FlamaMóvilesVerdes' }]
      }]
    };
  }

  /**
   * Summary: called by the html. receives an input element and adds its value to the element list being master and
   * without any subtasks.
   *
   * @param newElement an HTML input element to be added
   */
  onAddElement(newElement: HTMLInputElement): void {
    if (newElement.value) { // if the element exists
      this.addElement(newElement.value);
      newElement.value = '';
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
    this.refreshOrder();
  }

  /**
   * Summary: receives an order number (id - like) of its parent element and removes
   * the slave (subtaks) searching by its name (text).
   *
   * @param order order of the parent. the order refeers to the list.elementos position.
   * @param text the text of the slave element to be removed.
   */
  onDeleteSlave(order: number, text: string): void {
    this.list.elementos[order].subTasks =
      this.list.elementos[order].subTasks.filter(slave => slave.name !== text);
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
            this.list.elementos[i].subTasks.push({ name: futureSlave.text });
            this.onDeleteElementMaster(futureSlave.order);
            break;
          }
        }
        // foreach every subtask, and make them master (they are freed from the master)
        futureSlave.subTasks.forEach(subTaskOrder => {
          this.addElement(subTaskOrder.name);
        });
        futureSlave.subTasks = []; // remove the subtasks of the future slave
        this.refreshOrder(); // refresh the order
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
   * @param text the text of the future master element.
   */
  onMakeMaster(order: number, text: string): void {
    this.onDeleteSlave(order + 1, text);
    this.addElement(text);
    this.refreshOrder();
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
   * Summary: receives a drag event and switches positions and reflects it in the main array.
   *
   * @param event the event received to switch two element positions.
   */
  onDrop(event: CdkDragDrop<string[]>): void {
    const aux = this.list.elementos[event.currentIndex].order;
    this.list.elementos[event.currentIndex].order = this.list.elementos[event.previousIndex].order;
    this.list.elementos[event.previousIndex].order = aux;
    moveItemInArray(this.list.elementos, event.previousIndex, event.currentIndex);
    this.refreshOrder();
  }

  /**
   * Refreshes the order of the elements. Every order property will pertain at its own
   * array position.
   */
  private refreshOrder() {
    let counter = 0;
    for (const element of this.list.elementos) {
      if (element) {
        element.order = counter;
        counter++;
      }
    }
  }

  /**
   * Summary: adds an element to the element.list being master and without any subtasks,
   * but first checks if that element doesn't exist as master or slave.
   *
   * @param newElement the text to be added.
   */
  private addElement(newElement: string) {
    let isRepeated = false;
    // check for repeated elements as master
    if (this.list.elementos.find(element => element.text === newElement)) {
      isRepeated = true;
    }
    if (!isRepeated) { // if still wasn't found any ocurrence...
      // check for repeated elements as slave
      this.list.elementos.forEach(element => {
        if (element.subTasks.find(subTask => subTask.name === newElement)) {
          isRepeated = true;
        }
      });
    }

    if (isRepeated) {
      this.errorSnackbarDisplayerService.openSnackBar(`El elemento ${newElement} ya existe.`, SnackBarErrorType.warning);
    }

    this.list.elementos.push({
      order: this.list.elementos.length + 1,
      text: newElement.trim(),
      master: true,
      subTasks: []
    });
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
