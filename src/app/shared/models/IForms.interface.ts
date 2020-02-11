/**
 * Interface used in the Forms abstract class. All of the child classes that
 * extend from Forms will have to implement an onSubmit function.
 */
export interface IForm {
    /**
     * Summary: onSubmit is the function called by the submit button from the view.
     */
    onSubmit(): void;
}
