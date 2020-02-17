import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Forms } from 'src/app/shared/classes/Forms.class';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class ContactComponent extends Forms {
  hide: boolean;
  email: FormControl;
  asunto: FormControl;
  mensaje: FormControl;
  captcha: FormControl;

  constructor(private errorSnackbarDisplayerService: SnackbarDisplayerService) {
    super();
    this.hide = true;
    this.email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]);
    this.asunto = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(80)]);
    this.mensaje = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(516)]);
    this.captcha = new FormControl('', [Validators.required]);
    this.inputs = [this.email, this.asunto, this.mensaje, this.captcha];
  }

  onSubmit(): void {
    if (this.validateInputs()) { // IF THE INPUTS ARE VALID
      // TODO: SEND THE EMAIL
      this.clearInputs();
    } else {
      this.errorSnackbarDisplayerService.openSnackBar('Valores incorrectos', SnackBarErrorType.warning);
    }
  }

  /**
   * Summary: receives the captcha event (the token) and assigns it to the formcontrol created.
   *
   * @param captchaResponse The token of the response
   */
  assignCaptcha(captchaResponse: string) {
    this.captcha.setValue(captchaResponse);
  }

  /**
   * Summary: checks if the input has any error, and if that is the case it will return a string
   * with the problem, if there is no error it will simply return an empty string.
   *
   * @return string of the first error found.
   */
  getEmailErrorMessage(): string {
    return this.email.hasError('required') ? 'Debes introducir un email' :
      this.email.hasError('email') ? 'Introduce un email válido' :
        this.email.hasError('maxLength') ? 'Debes de introducir un email con menos de 255 carácteres.' :
          '';
  }

  /**
   * Summary: checks if the input has any error, and if that is the case it will return a string
   * with the problem, if there is no error it will simply return an empty string.
   *
   * @return string of the first error found.
   */
  getAsuntoErrorMessage(): string {
    return this.asunto.hasError('required') ? 'Debes introducir un asunto' :
      this.asunto.hasError('minlength') ? 'Debes de introducir un asunto con al menos 6 carácteres.' :
        this.asunto.hasError('maxLength') ? 'Debes de introducir un asunto con menos de 80 carácteres.' :
          '';
  }



  getCaptchaErrorMessage(): string {
    return this.asunto.hasError('required') ? 'Debes hacer clic en la casilla' :
      '';
  }

  /**
   * Summary: checks if the input has any error, and if that is the case it will return a string
   * with the problem, if there is no error it will simply return an empty string.
   *
   * @return string of the first error found.
   */
  getMensajeErrorMessage(): string {
    return this.mensaje.hasError('required') ? 'Debes introducir un mensaje' :
      this.mensaje.hasError('minlength') ? 'Debes de introducir un mensaje con al menos 10 carácteres.' :
        this.mensaje.hasError('maxLength') ? 'Debes de introducir un mensaje con menos de 255 carácteres.' :
          '';
  }



}
