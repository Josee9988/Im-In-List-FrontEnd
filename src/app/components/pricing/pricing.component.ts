import { Component, AfterViewChecked } from '@angular/core';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
declare let paypal: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements AfterViewChecked {

  addScript: boolean;
  paypalLoad: boolean;
  finalAmount: number;
  paypalConfig: any;

  constructor(private snackbarDisplayer: SnackbarDisplayerService) {
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
          // Do something when payment is successful.
          console.log(payment);
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

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

}
