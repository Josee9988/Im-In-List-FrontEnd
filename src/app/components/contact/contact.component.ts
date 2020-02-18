import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';
import { Captcha } from 'src/app/shared/classes/Captcha.class';
import { ISendMail } from '../../shared/models/ISendMail.interface';
import { MailService } from 'src/app/shared/services/mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class ContactComponent extends Captcha implements OnDestroy {
  hide: boolean;
  email: FormControl;
  asunto: FormControl;
  mensaje: FormControl;
  private observableMail: any;

  constructor(private errorSnackbarDisplayerService: SnackbarDisplayerService, private mailService: MailService) {
    super();
    this.hide = true;
    this.email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]);
    this.asunto = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(80)]);
    this.mensaje = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(516)]);
    this.inputs = [this.email, this.asunto, this.mensaje, this.captcha];
  }

  onSubmit(): void {
    if (this.validateInputs()) { // IF THE INPUTS ARE VALID
      const sendMail: ISendMail = { email: this.email.value, asunto: this.asunto.value, mensaje: this.mensaje.value };
      this.observableMail = this.mailService.sendMail(sendMail).subscribe(() => {
        this.errorSnackbarDisplayerService.openSnackBar('Mail enviado', SnackBarErrorType.success);
      });
    } else { // IF THE INPUTS ARE NOT VALID
      this.errorSnackbarDisplayerService.openSnackBar('Valores incorrectos', SnackBarErrorType.warning);
    }
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

  ngOnDestroy() {
    if (this.observableMail) {
      this.observableMail.unsubscribe();
    }
  }
}
