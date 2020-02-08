import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { SnackBarErrorType } from '../enums/snackbar-error-type.enum';

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
  public openSnackBar(message: string, action: SnackBarErrorType, duration: number = 4000): void {
    const receivedClass = this.getConfigStyleClass(action);
    const config = new MatSnackBarConfig();
    config.panelClass = [receivedClass];
    this.zone.run(() => { this.snackBar.open(message, action, { duration, panelClass: config.panelClass }); });
  }

  /**
   * Summary: getConfigStyleClass según el tipo de SnackBarErrorType, devuelve la
   * respectiva clase css asociada a dicho SnackBarErrorType.
   *
   * @param action el tipo de acción a aplicar.
   * @return string con la clase css a ser aplicada.
   */
  private getConfigStyleClass(action: SnackBarErrorType): string {
    switch (action) {
      case SnackBarErrorType.error:
        return 'snackbar-error';
      case SnackBarErrorType.informational:
        return 'snackbar-info';
      case SnackBarErrorType.warning:
        return 'snackbar-warning';
      case SnackBarErrorType.success:
        return 'snackbar-success';
      default:
        return 'snackbar-info';
    }
  }
}
