import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Forms } from './../../shared/classes/Forms.class';
import { UserService } from './../../shared/services/user.service';
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
export class EditProfileComponent extends Forms implements OnInit {
  editName: boolean;
  editEmail: boolean;
  editPassword: boolean;
  editPicture: boolean;
  adminAuth: boolean;

  hide: boolean;
  name: FormControl;
  email: FormControl;
  oldPassword: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  files: File[];
  groupPassword: FormGroup;
  optionsRole: any;

  usuarioEditar: any;
  nombreUsuario: string;
  emailUsuario: string;


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
    this.files = [];
    this.optionsRole = [
      { value: 'steak-0', viewValue: 'Steak' },
      { value: 'pizza-1', viewValue: 'Pizza' },
      { value: 'tacos-2', viewValue: 'Tacos' }
    ];

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
      this.userService.getUser(Number(id)).subscribe(Response => {
        if (Response) {
          this.usuarioEditar = Response;
          this.nombreUsuario = Response.name;
          this.emailUsuario = Response.email;
        } else {
          alert('Este usuario no existe');
        }
      });
    }
  }
  /**
   * Sumary: Function from SUPER that check the inputs available and validate them. Once validated, redirect to PUT method
   */
  onSubmit(): void {
    this.checkInputs();
    if (super.validateInputs()) {
      if (this.editName) {
        this.sendModificatinos(1);
      } else if (this.editEmail) {
        this.sendModificatinos(2);
      } else if (this.editPassword) {
        this.inputs = [this.oldPassword, this.password, this.confirmPassword];
      }

      console.log(this.usuarioEditar);

      super.clearInputs();

    } else {

    }
  }
  /**
   * Sumary: This function gets a code and send the put http pettition to update the user
   * @param option Is the option depending which inputs have been edited
   */
  sendModificatinos(option: number): void {
    switch (option) {
      case 1:
        this.usuarioEditar.name = this.name.value;
        this.userService.putUser(this.usuarioEditar).subscribe(Response => {
          this.errorSnackbarDisplayerService.openSnackBar('Nombre modificado correctamente!', SnackBarErrorType.success);
          console.log(Response);
        });
        break;
      case 2:
        this.usuarioEditar.email = this.email.value;
        this.userService.putUser(this.usuarioEditar).subscribe(Response => {
          this.errorSnackbarDisplayerService.openSnackBar('Email modificado correctamente!', SnackBarErrorType.success);
          console.log(Response);
        });
        break;
      default:
        break;
    }

  }
  /**
   * Sumary: This function check which toggle is activated and choose the correct inputs
   */
  checkInputs(): void {
    if (this.editName) {
      this.inputs = [this.name];
    } else if (this.editEmail) {
      this.inputs = [this.email];
    } else if (this.editPassword) {
      this.inputs = [this.oldPassword, this.password, this.confirmPassword];
    }
  }

  /**
   * Sumary: This function turn off other inputs opened
   * @param id It's the input that has been opened
   */
  closeToggleInputs(id: number): void {
    switch (id) {
      case 1:
        this.editEmail = undefined;
        this.editPassword = undefined;
        this.editPicture = undefined;
        break;
      case 2:
        this.editName = undefined;
        this.editPassword = undefined;
        this.editPicture = undefined;
        break;
      case 3:
        this.editName = undefined;
        this.editEmail = undefined;
        this.editPicture = undefined;
        break;
      case 4:
        this.editName = undefined;
        this.editEmail = undefined;
        this.editPassword = undefined;
        break;
      default:
        break;
    }
  }

  /**
   * Sumary: This function check if the password is the same as confirmed one
   */
  checkPasswords(): boolean {
    if (this.password.value === this.confirmPassword.value) {
      return true;
    }
    return false;
  }

  /**
   * Sumary: If there is any error on the input, this function will return a message.
   * @return string with errors found
   */
  getEmailErrorMessage(): string {
    return this.email.hasError('required') ? 'Debes introducir un email' :
      this.email.hasError('email') ? 'Introduce un email válido' :
        this.email.hasError('maxLength') ? 'Debes de introducir un email con menos de 255 carácteres.' :
          '';
  }
  /**
   * Sumary: If there is any error on the input, this function will return a message.
   * @return string with errors found
   */
  getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? 'Debes introducir una contraseña' :
      this.password.hasError('minlength') ? 'Debes de introducir una contraseña con al menos 4 carácteres.' :
        '';
  }
  /**
   * Sumary: If there is any error on the input, this function will return a message.
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
   * Sumary: If there is any error on the input, this function will return a message.
   * @return string with errors found
   */
  getNameErrorMessage(): string {
    return this.name.hasError('required') ? 'Debes introducir un nombre de usuario' :
      this.name.hasError('minlength') ? 'Debes de introducir un nombre de usuario con al menos 4 carácteres.' :
        this.email.hasError('maxLength') ? 'Debes de introducir un nombre de usuario con menos de 60 carácteres.' :
          '';
  }

  /**
   * Sumary: This function push the picture that user have choosed to the array of files
   * @param picture Is the picture that user add
   */
  onSelect(picture: any) {
    this.files.push(...picture.addedFiles);
  }

  /**
   * Sumary: This function remove the picture that user have choosed to the array of files
   * @param picture Is the picture that user decide to remove
   */
  onRemove(picture: any) {
    this.files.splice(this.files.indexOf(picture), 1);
  }

  /**
   * Sumary: This function will redirect the user back
   */
  goBack(): void {
    this.location.back();
  }
}
