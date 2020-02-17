import { FormControl } from '@angular/forms';
import { Forms } from './Forms.class';

export abstract class Captcha extends Forms {
    protected captcha: FormControl;

    constructor() {
        super();
    }


    /**
     * Summary: function that is invoked from the captcha button. It receives
     * the token as adds it to the captcha.value FormControl.
     *
     * @param captchaResponse token given from the captcha.
     */
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
