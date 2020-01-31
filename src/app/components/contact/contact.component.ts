import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  hide: boolean;
  email: FormControl;
  asunto: FormControl;
  mensaje: FormControl;
  inputs: Array<FormControl>;

  constructor() {
    this.hide = true;
    this.email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]);
    this.asunto = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(80)]);
    this.mensaje = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(516)]);
    this.inputs = [this.email, this.asunto, this.mensaje];
  }

  ngOnInit() {
  }

  getProgressBarValue(): number {
    let progress = 100;
    for (const input of this.inputs) {
      if (input.invalid) {
        progress -= 100 / this.inputs.length;
      }
    }
    return progress;
  }

  getEmailErrorMessage(): string {
    return this.email.hasError('required') ? 'Debes introducir un email' :
      this.email.hasError('email') ? 'Introduce un email válido' :
        this.email.hasError('maxLength') ? 'Debes de introducir un email con menos de 255 carácteres.' :
          '';
  }

  getAsuntoErrorMessage(): string {
    return this.asunto.hasError('required') ? 'Debes introducir una asunto' :
      this.asunto.hasError('minlength') ? 'Debes de introducir un asunto con al menos 6 carácteres.' :
        this.asunto.hasError('maxLength') ? 'Debes de introducir un asunto con menos de 80 carácteres.' :
          '';
  }

  getMensajeErrorMessage(): string {
    return this.mensaje.hasError('required') ? 'Debes introducir una mensaje' :
      this.mensaje.hasError('minlength') ? 'Debes de introducir un mensaje con al menos 10 carácteres.' :
        this.mensaje.hasError('maxLength') ? 'Debes de introducir un mensaje con menos de 255 carácteres.' :
          '';
  }


}
