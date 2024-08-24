"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (req, res, next) => {
    console.log("Init Middleware :: validator.check");
    // Se obtiene los errores a partir del request original de la petición
    const errors = (0, express_validator_1.validationResult)(req);
    // Si no existen errores la petición continúa
    if (errors.isEmpty())
        return next();
    // Si devuelven los errores con un estado de petición
    return res.status(400).json(errors.array());
};
exports.validate = validate;
