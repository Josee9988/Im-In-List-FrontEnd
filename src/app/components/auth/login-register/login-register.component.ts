import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  hide = true;
  email: FormControl;
  password: FormControl;
  inputs: Array<FormControl>;

  constructor() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.inputs = [this.email, this.password];
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
        '';
  }

  getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? 'Debes introducir una contraseña' :
      this.password.hasError('minlength') ? 'Debes de introducir una contraseña con al menos 4 carácteres.' :
        '';
  }

}
