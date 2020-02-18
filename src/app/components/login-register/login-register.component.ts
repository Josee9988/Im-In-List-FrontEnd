import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginUser, IRegisterUser } from 'src/app/shared/models/ILogin-user.interface';
import { UserService } from '../../shared/services/user.service';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';
import { RefreshNavbarCommunication } from 'src/app/shared/services/communications/refresh-navbar.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Captcha } from 'src/app/shared/classes/Captcha.class';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class LoginRegisterComponent extends Captcha implements OnInit, OnDestroy {
  public isRegister: boolean;
  isHidden: boolean;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  token: string;

  cookieChecked: FormControl;

  private observableSubmit: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private errorSnackbarDisplayerService: SnackbarDisplayerService,
    private refreshNavbarCommunication: RefreshNavbarCommunication,
    private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.isHidden = true;
    this.cookieChecked = new FormControl('', [Validators.requiredTrue]);
    this.email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);

    if (this.router.url.includes('register')) { // si es un formulario de registro
      this.isRegister = true;
      this.name = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);
      this.inputs = [this.email, this.password, this.name, this.captcha, this.cookieChecked];
    } else { // si es un formulario de login
      this.isRegister = false;
      this.inputs = [this.email, this.password, this.cookieChecked];
    }
  }

  onSubmit(): void {
    if (this.validateInputs()) { // IF THE INPUTS ARE VALID
      if (this.isRegister) { // REGISTER
        const registerUser: IRegisterUser =
          // tslint:disable-next-line: one-line
          { name: this.name.value, email: this.email.value, password: this.password.value, captcha: this.captcha.value };
        this.observableSubmit = this.userService.postUser(registerUser).subscribe(Response => this.saveToken(Response.token, false));
      } else { // LOGIN
        const loginUser: ILoginUser = { email: this.email.value, password: this.password.value };
        this.observableSubmit = this.userService.postLogin(loginUser).subscribe(Response => (this.saveToken(Response.token, true)));
      }

    } else {
      this.errorSnackbarDisplayerService.openSnackBar('Valores incorrectos', SnackBarErrorType.warning);
    }
  }

  /**
   * Summary: receives the token and saves it to the localStorage if the token exists,
   * then it navigates to the profile, sends a snackbar message and refreshes the navbar component.
   *
   * @param token the token that comes from the API.
   * @param isLogin if the petition comes from the login(true) of from the register(false).
   */
  saveToken(token: string, isLogin: boolean): void {
    if (this.authService.checkGivenToken(token)) { // IF THE TOKEN EXISTS AND SEEMS VALID
      this.authService.saveAuthorizationToken(token);
      this.router.navigate(['/profile']);
      if (isLogin) { // if comes from LOGIN
        this.errorSnackbarDisplayerService.openSnackBar(
          'Login realizado de manera satisfactoria. ¡Bienvenido de nuevo!', SnackBarErrorType.success);
      } else {// if comes from REGISTER
        this.errorSnackbarDisplayerService.openSnackBar(
          `Gracias por registrarte ${Response.name}. ¡Bienvenido!`, SnackBarErrorType.success);
      }
      this.refreshNavbarCommunication.next(1); // refresh navbar data
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
        this.name.hasError('maxLength') ? 'Debes de introducir un nombre de usuario con menos de 60 carácteres.' :
          '';
  }

  ngOnDestroy() {
    if (this.observableSubmit) {
      this.observableSubmit.unsubscribe();
    }
  }
}
