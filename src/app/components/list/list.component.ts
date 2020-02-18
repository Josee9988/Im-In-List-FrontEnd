import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ILista } from '../../shared/models/IListas.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarDisplayerService } from '../../shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';
import { ListaService } from 'src/app/shared/services/lista.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ShowDialogComponent } from './show-dialog/show-dialog.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Captcha } from 'src/app/shared/classes/Captcha.class';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class ListComponent extends Captcha implements OnInit, OnDestroy {
  @Input() list: ILista;

  @ViewChild('newElementInput', { static: false }) newElementInput: ElementRef;
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  public titulo: FormControl;
  public descripcion: FormControl;
  public password: FormControl;

  private observableGetLista: any;
  private observableSubmit: any;

  public isHidden: boolean;
  public hasPassword: boolean;
  private isEditing: boolean;

  windowHeight: number;

  constructor(
    private errorSnackbarDisplayerService: SnackbarDisplayerService,
    private listaService: ListaService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthService) {
    super();
    this.titulo = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);
    this.descripcion = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.isEditing = false;
  }

  ngOnInit() {
    this.windowHeight = window.innerHeight / 2.5; // asign the right PXs for the scrollable list

    const givenUrl = this.route.snapshot.paramMap.get('url');
    if (givenUrl) {
      this.isEditing = true;
      this.observableGetLista = this.listaService.getLista(givenUrl).subscribe(Response => {
        if (Response.message === 'Error, indique la contraseña de la lista') {
          console.log('La lista está protegida');
          this.isLocked();
        } else {
          this.list = {
            titulo: '',
            descripcion: '',
            items: JSON.parse(JSON.parse(Response.elementos)),
            url: givenUrl,
            captcha: '',
          };
          this.titulo.setValue(Response.titulo);
          this.descripcion.setValue(Response.descripcion);
        }
      });
    } else {
      this.list = {
        titulo: '',
        descripcion: '',
        items: [],
        captcha: ''
      };
    }

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
    this.list.items = this.list.items.filter(element => element.order !== order);
    this.refreshOrder();
  }

  /**
   * Summary: receives an order number (id - like) of its parent element and removes
   * the slave (subtaks) searching by its name (text).
   *
   * @param order order of the parent. the order refeers to the list.items position.
   * @param text the text of the slave element to be removed.
   */
  onDeleteSlave(order: number, text: string): void {
    this.list.items[order].subTasks =
      this.list.items[order].subTasks.filter(slave => slave.name !== text);
  }

  /**
   * Summary: receives an order number (id - like) of an master element and turns it
   * into a slave element.
   *
   * @param order the order number of the element that we want to make slave.
   */
  onMakeSlave(order: number): void {
    if (this.list.items[0].order !== order) {
      const futureSlave = this.list.items.find(elemento => elemento.order === order);
      if (futureSlave) {
        futureSlave.master = false;
        for (let i = futureSlave.order; i >= 0; i--) { // asign the master of the futureSlave
          if (typeof this.list.items[i] !== 'undefined' && this.list.items[i].master) {
            this.list.items[i].subTasks.push({ name: futureSlave.text });
            this.onDeleteElementMaster(futureSlave.order);
            break;
          }
        }
        futureSlave.subTasks.forEach(subTaskOrder => {// foreach every subtask, and make them master (they are freed from the master)
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
    this.onDeleteSlave(order, text);
    this.addElement(text);
    this.refreshOrder();
  }

  onSubmit(): void {
    if (this.list.items.length > 0) {
      if (this.hasPassword) {
        this.inputs = [this.titulo, this.descripcion, this.password, this.captcha];
      } else {
        this.inputs = [this.titulo, this.descripcion, this.captcha];
      }
      this.list.captcha = this.captcha.value;
      this.list.titulo = this.titulo.value;
      this.list.descripcion = this.descripcion.value;
      this.list.elementos = JSON.stringify(this.list.items);
      if (this.validateInputs()) { // IF THE INPUTS ARE VALID
        if (this.isEditing) { // EDITING
          this.list.url = null;

          if (this.authService.hasToken()) { // IS LOGGED IN
            this.observableSubmit = this.listaService.putListaRegistered(this.list).subscribe((Response) => {
              if (typeof Response.lista !== 'undefined') {
                this.openDialog(Response.lista.url);
              }
              this.errorSnackbarDisplayerService.openSnackBar('Lista guardada', SnackBarErrorType.success);
            });
          } else { // NOT LOGGED IN
            this.observableSubmit = this.listaService.putLista(this.list).subscribe((Response) => {
              if (typeof Response.lista !== 'undefined') {
                this.openDialog(Response.lista.url);
              }
              this.errorSnackbarDisplayerService.openSnackBar('Lista guardada', SnackBarErrorType.success);
            });
          }

        } else { // CREATING
          this.list.url = this.list.titulo;
          if (this.authService.hasToken()) { // IS LOGGED IN
            this.observableSubmit = this.listaService.postListaRegistered(this.list).subscribe((Response) => {
              if (typeof Response.lista !== 'undefined') {
                this.openDialog(Response.lista.url);

                this.errorSnackbarDisplayerService.openSnackBar('Lista guardada', SnackBarErrorType.success);
              }
            });

          } else { // NOT LOGGED IN
            this.observableSubmit = this.listaService.postLista(this.list).subscribe((Response) => {
              if (typeof Response.lista.url !== 'undefined') {
                this.openDialog(Response.lista.url);
              }
              this.errorSnackbarDisplayerService.openSnackBar('Lista guardada', SnackBarErrorType.success);
            });
          }

        }

      } else { // IF ANY INPUT IS NOT READY
        this.errorSnackbarDisplayerService.openSnackBar('Valores incorrectos', SnackBarErrorType.warning);
      }
    } else {
      this.errorSnackbarDisplayerService.openSnackBar('Añade al menos un elemento a la lista', SnackBarErrorType.warning);
    }
  }

  /**
   * Summary: receives a drag event and switches positions and reflects it in the main array.
   *
   * @param event the event received to switch two element positions.
   */
  onDrop(event: CdkDragDrop<string[]>): void {
    const aux = this.list.items[event.currentIndex].order;
    this.list.items[event.currentIndex].order = this.list.items[event.previousIndex].order;
    this.list.items[event.previousIndex].order = aux;
    moveItemInArray(this.list.items, event.previousIndex, event.currentIndex);
    this.refreshOrder();
  }

  /**
   * Refreshes the order of the elements. Every order property will pertain at its own
   * array position.
   */
  private refreshOrder(): void {
    let counter = 0;
    for (const element of this.list.items) {
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
  private addElement(newElement: string): void {
    let isRepeated = false;
    // check for repeated elements as master
    if (this.list.items.find(element => element.text === newElement)) {
      isRepeated = true;
    }
    if (!isRepeated) { // if still wasn't found any ocurrence...
      // check for repeated elements as slave
      this.list.items.forEach(element => {
        if (element.subTasks.find(subTask => subTask.name === newElement)) {
          isRepeated = true;
        }
      });
    }
    if (!isRepeated) { // element not repeated (ok)
      this.list.items.push({
        order: this.list.items.length + 1,
        text: newElement.trim(),
        master: true,
        subTasks: []
      });
    } else { // if the element was repeated, dont add it
      this.errorSnackbarDisplayerService.openSnackBar(`El elemento ${newElement} ya existe.`, SnackBarErrorType.warning);
    }
  }


  openDialog(url: string) {
    this.dialog.open(ShowDialogComponent, {
      data: {
        url
      }
    });
  }
  /**
   * Sumary: This function will check if the list have password
   */
  isLocked() {
    this.listaService.
    return true;
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

  ngOnDestroy(): void {
    if (this.observableGetLista) {
      this.observableGetLista.unsubscribe();
    }
    if (this.observableSubmit) {
      this.observableSubmit.unsubscribe();
    }
  }
}
