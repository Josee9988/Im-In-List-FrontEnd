import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginUser, IRegisterUser } from 'src/app/shared/models/ILogin-user.interface';
import { UserService } from '../../shared/services/user.service';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  private isRegister: boolean;
  isHidden: boolean;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  inputs: Array<FormControl>;
  token: string;

  constructor(private userService: UserService, private router: Router, private errorSnackbarDisplayerService: SnackbarDisplayerService) { }

  ngOnInit() {
    this.isHidden = true;
    this.email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);

    if (this.router.url.includes('register')) { // si es un formulario de registro
      this.isRegister = true;
      this.name = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);
      this.inputs = [this.email, this.password, this.name];
    } else { // si es un formulario de login
      this.isRegister = false;
      this.inputs = [this.email, this.password];
    }
  }

  protected getProgressBarValue(): number {
    let progress = 100;
    for (const input of this.inputs) {
      if (input.invalid) {
        progress -= 100 / this.inputs.length;
      }
    }
    return progress;
  }

  protected getEmailErrorMessage(): string {
    return this.email.hasError('required') ? 'Debes introducir un email' :
      this.email.hasError('email') ? 'Introduce un email válido' :
        this.email.hasError('maxLength') ? 'Debes de introducir un email con menos de 255 carácteres.' :
          '';
  }

  protected getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? 'Debes introducir una contraseña' :
      this.password.hasError('minlength') ? 'Debes de introducir una contraseña con al menos 4 carácteres.' :
        '';
  }

  protected getNameErrorMessage(): string {
    return this.name.hasError('required') ? 'Debes introducir un nombre de usuario' :
      this.name.hasError('minlength') ? 'Debes de introducir un nombre de usuario con al menos 4 carácteres.' :
        this.email.hasError('maxLength') ? 'Debes de introducir un nombre de usuario con menos de 60 carácteres.' :
          '';
  }

  submit(): void {
    if (this.validateInputs()) { // IF THE INPUTS ARE VALID
      if (this.isRegister) { // REGISTER
        const registerUser: IRegisterUser = { name: this.name.value, email: this.email.value, password: this.password.value };
        this.userService.postUser(registerUser).subscribe();
      } else { // LOGIN
        const loginUser: ILoginUser = { email: this.email.value, password: this.password.value };
        this.userService.postLogin(loginUser).subscribe(Response => (this.functionSaveToken(Response.token)));
      }
      this.clearInputs();
    }
  }

  functionSaveToken(token: string): void {
    if (token) {
      localStorage.removeItem('loginUserToken');
      localStorage.setItem('loginUserToken', 'Bearer ' + token);
      this.router.navigate(['/profile']);
    }
  }

  validateInputs(): boolean {
    let areInputsValid = true;
    for (const input of this.inputs) {
      if (input.invalid) {
        areInputsValid = false;
      }
    }
    if (!areInputsValid) {
      this.errorSnackbarDisplayerService.openSnackBar('Debes rellenar todos los campos', SnackBarErrorType.warning);
    }
    return areInputsValid;
  }

  clearInputs(): void {
    for (const input of this.inputs) {
      input.setValue(null);
    }
  }
}
