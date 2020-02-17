import { FormControl } from '@angular/forms';
import { Forms } from './Forms.class';

export abstract class Captcha extends Forms {
    protected captcha: FormControl;

    constructor() {
        super();
    }


    protected onAssignCaptcha(captchaResponse: string): void {
        this.captcha.setValue(captchaResponse);
    }

    /**
     * Summary: checks if the input has any error, and if that is the case it will return a string
     * with the problem, if there is no error it will simply return an empty string.
     *
     * @return string of the first error found.
     */
    protected getCaptchaErrorMessage(): string {
        return this.captcha.hasError('required') ? 'Debes hacer clic en la casilla de verificación' :
            '';
    }

}
