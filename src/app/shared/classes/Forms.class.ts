import { FormControl } from '@angular/forms';

export class Forms {
    inputs: Array<FormControl>;

    constructor() { }


    protected getProgressBarValue(): number {
        let progress = 100;
        for (const input of this.inputs) {
            if (input.invalid) {
                progress -= 100 / this.inputs.length;
            }
        }
        return progress;
    }


    protected validateInputs(): boolean {
        let areInputsValid = true;
        for (const input of this.inputs) {
            if (input.invalid) {
                areInputsValid = false;
            }
        }
        return areInputsValid;
    }

    protected clearInputs(): void {
        for (const input of this.inputs) {
            input.setValue(null);
        }
    }
}
