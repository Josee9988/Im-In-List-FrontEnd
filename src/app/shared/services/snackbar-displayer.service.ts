import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarDisplayerService {

  constructor(public snackBar: MatSnackBar, private zone: NgZone) { }

  /**
   * Summary: openSnackBar inyecta un elemento de tipo 'SnackBar' abajo de la página
   * con un mensaje principal y un tipo de acción (error, éxito, información...) con un color
   * destacado, y se le puede especificar una duración en milisegundos.
   *
   * @param message mensaje principal del snackbar.
   * @param action tipo de snackbar/alerta mostrada al usuario, comunmente (Error/Éxito/Información).
   * @param duration duración en milisegundos del snackbar si esque no es cerrado por el usuario.
   */
  public openSnackBar(message: string, action: string = 'Error', duration: number = 400000): void {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snackbar-error'];
    this.zone.run(() => { this.snackBar.open(message, action, { duration, panelClass: config.panelClass }); });
  }
}
