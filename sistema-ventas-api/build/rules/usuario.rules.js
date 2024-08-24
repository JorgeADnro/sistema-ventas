"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRules = void 0;
const express_validator_1 = require("express-validator");
const usuarioRules = () => {
    return [
        (0, express_validator_1.body)("nombre")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Campo requerido")
            .isLength({ min: 3, max: 150 })
            .withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("apellidos")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Campo requerido")
            .isLength({ min: 3, max: 150 })
            .withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("username")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Campo requerido")
            .isLength({ min: 3, max: 150 })
            .withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("password")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Campo requerido")
            .isLength({ min: 3, max: 16 })
            .withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("email")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Campo requerido")
            .isEmail()
            .withMessage("Correo inválido"),
        (0, express_validator_1.body)("rol")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Campo requerido")
    ];
};
exports.usuarioRules = usuarioRules;
