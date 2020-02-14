import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
declare let paypal: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements AfterViewChecked, OnInit {
  addScript: boolean;
  paypalLoad: boolean;
  finalAmount: number;
  paypalConfig: any;
  canBePremium: boolean;

  @ViewChild('paypalBtn', { static: false }) paypalBtn: ElementRef;

  constructor(private snackbarDisplayer: SnackbarDisplayerService, private authService: AuthService, private userService: UserService) {
    this.addScript = false;
    this.paypalLoad = true;

    this.paypalConfig = {
      env: 'sandbox',
      client: {
        sandbox: 'AbE4JvVdwKszjoXjPQkHrWiuF3co5_6_HTYYJVHgnjqkQhkS5IUR1vUr4XGA2x8x644QG1HXuCuQZWCv',
        production: '<your-production-key here>'
      },
      commit: true,
      payment: (data, actions) => {
        return actions.payment.create({
          payment: {
            transactions: [
              { amount: { total: 1.99, currency: 'EUR' } }
            ]
          }
        });
      },
      onAuthorize: (data, actions) => {
        return actions.payment.execute().then((payment) => {
          console.log(payment);
          // TODO: send the data to the api
          // (https://stackoverflow.com/questions/46719613/how-to-verify-paypal-express-checkout-details-on-the-server)
          this.snackbarDisplayer.openSnackBar('Pago realizado correctamente', SnackBarErrorType.success);
        });
      }
    };
  }


  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      }).catch((error) => {
        this.snackbarDisplayer.openSnackBar('Error al cargar conectar con PayPal: ' + error, SnackBarErrorType.warning);
      });
    }
  }

  ngOnInit(): void {
    if (this.authService.hasToken()) { // si sí tiene el token
      this.userService.getDataUser().subscribe(Response => {
        // si tiene un rol ( la petición ha sido OK) y es admin o es un usuario premium, deshabilitamos el botón (if it can NOT buy premium)
        if (typeof Response.user.role !== 'undefined' && (Response.user.role === 2 || Response.user.role === 0)) {
          this.canBePremium = false;
        } else {
          this.canBePremium = true;
        }
      });
    } else {
      this.snackbarDisplayer.openSnackBar('Si no inicias sesión no podrás hacerte premium!', SnackBarErrorType.informational);
    }
  }

  /**
   * Summary: function that is invoked after the view is checked and after we add
   * the PayPal source code for making the calls.
   *
   * @return Promise with the resolved object.
   */
  addPaypalScript(): Promise<any> {
    this.addScript = true;
    return new Promise((resolve) => {

      if (!document.getElementById('paypalsrctag') ? true : false) { // if false the script is not already loaded and it will do it
        const scripttagElement = document.createElement('script');
        scripttagElement.id = 'paypalsrctag';
        scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
        scripttagElement.onload = resolve;
        document.body.appendChild(scripttagElement);
        console.log('added');

      }
    });
  }
}
