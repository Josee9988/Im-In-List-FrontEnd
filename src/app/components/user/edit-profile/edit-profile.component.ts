import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Forms } from '../../../shared/classes/Forms.class';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
/**
 * @author Borja Pérez Mullor <multibalcoy@gmail.com>
 */
export class EditProfileComponent extends Forms implements OnInit, OnDestroy {
  editName: boolean;
  editEmail: boolean;
  editPassword: boolean;
  editPicture: boolean;
  adminAuth: boolean;
  editRole: boolean;

  hide: boolean;
  name: FormControl;
  email: FormControl;
  oldPassword: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  files: File[];
  groupPassword: FormGroup;
  role: FormControl;

  usuarioEditar: any;
  nombreUsuario: string;
  emailUsuario: string;
  rolUsuario: number;

  private observableModification: any;
  private observableInit: any;

  constructor(
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute,
    private errorSnackbarDisplayerService: SnackbarDisplayerService, ) {
    super();
    this.hide = true;
    this.email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]);
    this.oldPassword = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.role = new FormControl('', [Validators.required]);
    this.files = [];
    this.name = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);

    this.groupPassword = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });


  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (Number(id) !== 0) {
      this.adminAuth = true;
      this.observableInit = this.userService.getUser(Number(id)).subscribe(Response => {
        if (Response) {
          this.usuarioEditar = Response;
          this.nombreUsuario = Response.name;
          this.emailUsuario = Response.email;
          this.rolUsuario = Response.role;
        }
      });
    } else {
      this.observableInit = this.userService.getDataUser().subscribe(Response => {
        if (Response) {
          this.usuarioEditar = Response.user;
          this.nombreUsuario = Response.user.name;
          this.emailUsuario = Response.user.email;
          this.rolUsuario = Response.user.role;
        }
      });
    }
  }

  /**
   * Summary: Function from SUPER that check the inputs available and validate them. Once validated, redirect to PUT method
   */
  onSubmit(): void {
    this.checkInputs();
    if (this.validateInputs()) {
      if (this.editName) {
        this.sendModifications(1);
      } else if (this.editEmail) {
        this.sendModifications(2);
      } else if (this.editPassword) {
        this.sendModifications(3);
      } else if (this.editPicture) {
        // Future check to upload pictures
      } else if (this.editRole) {
        this.sendModifications(5);
      }
    }
  }

  /**
   * Summary: This function gets a code and send the put http pettition to update the user
   *
   * @param option Is the option depending which inputs have been edited
   */
  sendModifications(option: number): void {
    switch (option) {
      case 1:
        this.usuarioEditar.name = this.name.value;
        this.observableModification = this.userService.putUser(this.usuarioEditar).subscribe(Response => {
          this.errorSnackbarDisplayerService.openSnackBar('Nombre modificado correctamente!', SnackBarErrorType.success);
        });
        break;
      case 2:
        this.usuarioEditar.email = this.email.value;
        this.observableModification = this.userService.putUser(this.usuarioEditar).subscribe(Response => {
          if (Response) {
            this.errorSnackbarDisplayerService.openSnackBar('Email modificado correctamente!', SnackBarErrorType.success);
          }
        });
        break;
      case 3:
        this.usuarioEditar.oldPassword = this.oldPassword.value;
        this.usuarioEditar.password = this.password.value;
        this.userService.putUser(this.usuarioEditar).subscribe(Response => {
          if (!Response.message) {
            this.errorSnackbarDisplayerService.openSnackBar('La contraseña anterior no es correcta.', SnackBarErrorType.error);
          } else {
            this.errorSnackbarDisplayerService.openSnackBar('Password modificado correctamente!', SnackBarErrorType.success);
            this.editPassword = undefined;
          }
        });
        break;
      case 4:
        // Future case to upload pictures
        break;
      case 5:
        this.usuarioEditar.role = this.role.value;
        this.observableModification = this.userService.putUser(this.usuarioEditar).subscribe(Response => {
          if (Response) {
            this.errorSnackbarDisplayerService.openSnackBar('Rol modificado correctamente!', SnackBarErrorType.success);
            this.editRole = undefined;
          }
        });
        break;
      default:
        break;
    }
  }

  /**
   * Summary: This function check which toggle is activated and choose the correct inputs
   */
  checkInputs(): void {
    if (this.editName) {
      this.inputs = [this.name];
    } else if (this.editEmail) {
      this.inputs = [this.email];
    } else if (this.editPassword) {
      this.inputs = [this.oldPassword, this.password, this.confirmPassword];
    } else if (this.editRole) {
      this.inputs = [this.role];
    }
  }

  /**
   * Summary: This function turn off other inputs opened
   * @param id It's the input that has been opened
   */
  closeToggleInputs(id: number): void {
    switch (id) {
      case 1:
        this.editEmail = undefined;
        this.editPassword = undefined;
        this.editPicture = undefined;
        this.editRole = undefined;
        break;
      case 2:
        this.editName = undefined;
        this.editPassword = undefined;
        this.editPicture = undefined;
        this.editRole = undefined;
        break;
      case 3:
        this.editName = undefined;
        this.editEmail = undefined;
        this.editPicture = undefined;
        this.editRole = undefined;
        break;
      case 4:
        this.editName = undefined;
        this.editEmail = undefined;
        this.editPassword = undefined;
        this.editRole = undefined;
        break;
      case 5:
        this.editName = undefined;
        this.editEmail = undefined;
        this.editPassword = undefined;
        this.editPicture = undefined;
        break;
      default:
        break;
    }
  }

  /**
   * Summary: This function check if the password is the same as confirmed one
   */
  checkPasswords(): boolean {
    if (this.password.value === this.confirmPassword.value) {
      return true;
    }
    return false;
  }

  /**
   * Summary: If there is any error on the input, this function will return a message.
   * @return string with errors found
   */
  getEmailErrorMessage(): string {
    return this.email.hasError('required') ? 'Debes introducir un email' :
      this.email.hasError('email') ? 'Introduce un email válido' :
        this.email.hasError('maxLength') ? 'Debes de introducir un email con menos de 255 carácteres.' :
          '';
  }
  /**
   * Summary: If there is any error on the input, this function will return a message.
   * @return string with errors found
   */
  getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? 'Debes introducir una contraseña' :
      this.password.hasError('minlength') ? 'Debes de introducir una contraseña con al menos 4 carácteres.' :
        '';
  }
  /**
   * Summary: If there is any error on the input, this function will return a message.
   * @return string with errors found
   */
  getConfirmPasswordErrorMessage(): string {
    if (this.checkPasswords()) {
      return this.confirmPassword.hasError('required') ? 'Debes introducir la confirmación de contraseña' :
        this.confirmPassword.hasError('minlength') ? 'Debes de introducir una contraseña con al menos 4 carácteres.' :
          '';
    } else if (!this.checkPasswords()) {
      const toReturn: string = this.confirmPassword.hasError('required') ? 'Debes introducir la confirmación de contraseña' :
        this.confirmPassword.hasError('minlength') ? 'Debes de introducir una contraseña con al menos 4 carácteres.' : '';
      return 'Las contraseñas nuevas deben coincidir. ' + toReturn;

    }
  }

  /**
   * Summary: If there is any error on the input, this function will return a message.
   * @return string with errors found
   */
  getNameErrorMessage(): string {
    return this.name.hasError('required') ? 'Debes introducir un nombre de usuario' :
      this.name.hasError('minlength') ? 'Debes de introducir un nombre de usuario con al menos 4 carácteres.' :
        this.email.hasError('maxLength') ? 'Debes de introducir un nombre de usuario con menos de 60 carácteres.' :
          '';
  }

  /**
   * Summary: This function push the picture that user have choosed to the array of files
   * @param picture Is the picture that user add
   */
  onSelect(picture: any): void {
    this.files.push(...picture.addedFiles);
  }

  /**
   * Summary: This function remove the picture that user have choosed to the array of files
   * @param picture Is the picture that user decide to remove
   */
  onRemove(picture: any): void {
    this.files.splice(this.files.indexOf(picture), 1);
  }

  /**
   * Summary: This function will redirect the user back
   */
  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.observableModification) {
      this.observableModification.unsubscribe();
    }
    if (this.observableInit) {
      this.observableInit.unsubscribe();
    }
  }
}
