import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Forms } from 'src/app/shared/classes/Forms.class';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends Forms {
  hide: boolean;
  email: FormControl;
  asunto: FormControl;
  mensaje: FormControl;

  constructor(private errorSnackbarDisplayerService: SnackbarDisplayerService) {
    super();
    this.hide = true;
    this.email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]);
    this.asunto = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(80)]);
    this.mensaje = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(516)]);
    this.inputs = [this.email, this.asunto, this.mensaje];
  }


  getEmailErrorMessage(): string {
    return this.email.hasError('required') ? 'Debes introducir un email' :
      this.email.hasError('email') ? 'Introduce un email válido' :
        this.email.hasError('maxLength') ? 'Debes de introducir un email con menos de 255 carácteres.' :
          '';
  }

  getAsuntoErrorMessage(): string {
    return this.asunto.hasError('required') ? 'Debes introducir un asunto' :
      this.asunto.hasError('minlength') ? 'Debes de introducir un asunto con al menos 6 carácteres.' :
        this.asunto.hasError('maxLength') ? 'Debes de introducir un asunto con menos de 80 carácteres.' :
          '';
  }

  getMensajeErrorMessage(): string {
    return this.mensaje.hasError('required') ? 'Debes introducir un mensaje' :
      this.mensaje.hasError('minlength') ? 'Debes de introducir un mensaje con al menos 10 carácteres.' :
        this.mensaje.hasError('maxLength') ? 'Debes de introducir un mensaje con menos de 255 carácteres.' :
          '';
  }

  onSubmit(): void {
    if (super.validateInputs()) { // IF THE INPUTS ARE VALID
      // TODO: SEND THE EMAIL
      super.clearInputs();
    } else {
      this.errorSnackbarDisplayerService.openSnackBar('Valores incorrectos', SnackBarErrorType.warning);
    }
  }


}
