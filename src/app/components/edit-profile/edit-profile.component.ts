import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Forms } from './../../shared/classes/Forms.class';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends Forms {
  editName: boolean;
  editEmail: boolean;
  editPassword: boolean;
  editPicture: boolean;

  hide: boolean;
  name: FormControl;
  email: FormControl;
  oldPassword: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  files: File[];
  groupPassword: FormGroup;

  constructor(private location: Location) {
    super();
    this.hide = true;
    this.email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]);
    this.oldPassword = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.files = [];

    this.name = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);

    this.groupPassword = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }

  onSubmit(): void {
    this.checkInputs();
    if (super.validateInputs()) {
      super.clearInputs();
    } else {

    }
  }


  /**
   * Sumary: This function check which inputs are active
   */
  checkInputs(): void {
    if (this.editName === true) {
      this.inputs = [this.name];
    } else if (this.editEmail === true) {

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
        this.edit
        break;

      default:
        break;
    }


  }

  checkPasswords(): boolean {
    if (this.password.value === this.confirmPassword.value) {
      return true;
    }
    return false;
  }

  getEmailErrorMessage(): string {
    return this.email.hasError('required') ? 'Debes introducir un email' :
      this.email.hasError('email') ? 'Introduce un email válido' :
        this.email.hasError('maxLength') ? 'Debes de introducir un email con menos de 255 carácteres.' :
          '';
  }

  getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? 'Debes introducir una contraseña' :
      this.password.hasError('minlength') ? 'Debes de introducir una contraseña con al menos 4 carácteres.' :
        '';
  }

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
  getNameErrorMessage(): string {
    return this.name.hasError('required') ? 'Debes introducir un nombre de usuario' :
      this.name.hasError('minlength') ? 'Debes de introducir un nombre de usuario con al menos 4 carácteres.' :
        this.email.hasError('maxLength') ? 'Debes de introducir un nombre de usuario con menos de 60 carácteres.' :
          '';
  }


  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  goBack(): void {
    this.location.back();
  }
}
