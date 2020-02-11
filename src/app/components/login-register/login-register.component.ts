import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginUser, IRegisterUser } from 'src/app/shared/models/ILogin-user.interface';
import { UserService } from '../../shared/services/user.service';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';
import { Forms } from 'src/app/shared/classes/Forms.class';
import { CommunicationService } from 'src/app/shared/services/communication.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class LoginRegisterComponent extends Forms implements OnInit {
  private isRegister: boolean;
  isHidden: boolean;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  token: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private errorSnackbarDisplayerService: SnackbarDisplayerService,
    private communicationService: CommunicationService) {
    super();
  }

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

  onSubmit(): void {
    if (super.validateInputs()) { // IF THE INPUTS ARE VALID
      if (this.isRegister) { // REGISTER
        const registerUser: IRegisterUser = { name: this.name.value, email: this.email.value, password: this.password.value };
        this.userService.postUser(registerUser).subscribe(Response => this.registerMessage(Response));
      } else { // LOGIN
        const loginUser: ILoginUser = { email: this.email.value, password: this.password.value };
        this.userService.postLogin(loginUser).subscribe(Response => (this.saveToken(Response.token)));
      }
      super.clearInputs();
    } else {
      this.errorSnackbarDisplayerService.openSnackBar('Valores incorrectos', SnackBarErrorType.warning);
    }
  }

  /**
   * Summary: receives the token and saves it to the localStorage if the token exists.
   *
   * @param token the token to be saved.
   */
  saveToken(token: string): void {
    if (token) { // IF TOKEN EXISTS
      localStorage.removeItem('loginUserToken');
      localStorage.setItem('loginUserToken', 'Bearer ' + token);
      this.router.navigate(['/profile']);
      this.errorSnackbarDisplayerService.openSnackBar(
        'Login realizado de manera satisfactoria. ¡Bienvenido de nuevo!', SnackBarErrorType.success);
      this.communicationService.next(1);
    }
  }

  /**
   * Summary: receives the response from the api and checks if it is OK; if so it will
   * show a snackbar message otherwise nothing.
   *
   * @param Response the response from the api
   */
  registerMessage(Response: any): void {
    if (Response.ok) { // If all ok
      this.errorSnackbarDisplayerService.openSnackBar(
        `Gracias por registrarte ${Response.name}. ¡Bienvenido!`, SnackBarErrorType.success);
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
  getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? 'Debes introducir una contraseña' :
      this.password.hasError('minlength') ? 'Debes de introducir una contraseña con al menos 4 carácteres.' :
        '';
  }

  /**
   * Summary: checks if the input has any error, and if that is the case it will return a string
   * with the problem, if there is no error it will simply return an empty string.
   *
   * @return string of the first error found.
   */
  getNameErrorMessage(): string {
    return this.name.hasError('required') ? 'Debes introducir un nombre de usuario' :
      this.name.hasError('minlength') ? 'Debes de introducir un nombre de usuario con al menos 4 carácteres.' :
        this.email.hasError('maxLength') ? 'Debes de introducir un nombre de usuario con menos de 60 carácteres.' :
          '';
  }
}
