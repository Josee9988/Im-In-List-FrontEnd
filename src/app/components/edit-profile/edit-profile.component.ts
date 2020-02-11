import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  hide: boolean;
  name: FormControl;
  email: FormControl;
  oldPassword: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  inputs: Array<FormControl>;
  files: File[];
  groupPassword: FormGroup;

  constructor(private location: Location) {
    this.hide = true;
    this.email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]);
    this.oldPassword = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.files = [];

    this.name = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]);
    this.inputs = [this.email, this.password, this.name];

    this.groupPassword = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }

  checkPasswords(): boolean {
    if (this.password.value === this.confirmPassword.value) {
      return true;
    }
    return false;
  }

  ngOnInit() {
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
