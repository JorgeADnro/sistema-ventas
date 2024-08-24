import { body } from "express-validator";

export const usuarioRules = () => {
    return [
        body("nombre")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Campo requerido")
        .isLength({min: 3, max: 150})
        .withMessage("Rango Incorrecto"),
        body("apellidos")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Campo requerido")
        .isLength({min: 3, max: 150})
        .withMessage("Rango Incorrecto"),
        body("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Campo requerido")
        .isLength({min: 3, max: 150})
        .withMessage("Rango Incorrecto"),
        body("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Campo requerido")
        .isLength({min: 3, max: 16})
        .withMessage("Rango Incorrecto"),
        body("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Campo requerido")
        .isEmail()
        .withMessage("Correo inválido"),
        body("rol")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Campo requerido")
    ]
};