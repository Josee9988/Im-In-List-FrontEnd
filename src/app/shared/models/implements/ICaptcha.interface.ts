/**
 * Interface used in the Forms abstract class. All of the child classes that
 * extend from Forms will have to implement an onSubmit function.
 */
export interface ICaptcha {
    /**
     * Summary: receives the captcha event (the token) and assigns it to the formcontrol.value variable
     * to be validated when submitting.
     *
     * @param captchaResponse The token of the response that will be added
     */
    onAssignCaptcha(captchaResponse: string): void;
}
