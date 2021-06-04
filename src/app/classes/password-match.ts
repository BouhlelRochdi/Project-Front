import { AbstractControl } from '@angular/forms';

export function passwordMatch(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('passwordMatch');
    if (password.pristine || confirmPassword.pristine) {
        return null;
    }

    return password != undefined && confirmPassword && password.value !== confirmPassword.value ?
        { 'invalidPassword': true } :
        null;

}
