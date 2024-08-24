import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({providedIn: 'root'})
export class BaseForm {

    constructor() { }

    isValiedfield(form: AbstractControl | null): boolean {
        var bandera = false;

        if(form) 
            form.touched || form.dirty && form.invalid
        
        return bandera;
    }

    getErrorMessage(form: AbstractControl | null) {
        let message = "";

        if(form) {
            const { errors } = form;
            if(errors) {
                const messages: any = {
                    required: 'Campo requerido',
                    pattern: 'Formato inválido',
                    min: 'El rango no es correcto',
                    max: 'El rango no es correcto',
                    minlength: 'El rango no es correcto',
                    mismatch: 'Las contraseñas no coinciden'
                }
                const errorKey = Object.keys(errors).find(Boolean);
                if(errorKey) message = messages[errorKey];
            }
        }
        return message;
    }
}