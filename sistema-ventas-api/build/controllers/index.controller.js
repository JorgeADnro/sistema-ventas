"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const utils_1 = require("../utils/utils");
class IndexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ! testing
                //throw new RangeError('Error inesperado');
                const user = {
                    cveUsuario: 1,
                    nombre: "jose",
                    rol: [1, 2, 3]
                };
                const token = utils_1.utils.generateJWT(user);
                console.log(token);
                var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdmVVc3VhcmlvIjoxLCJub21icmUiOiJqb3NlIiwicm9sIjpbMSwyLDNdLCJpYXQiOjE3MjAyMjgxNDMsImV4cCI6MTcyMDIzMTc0M30.EEbSB2pce4zfs9qC8Rk11-i8L9AAm4oRfkIqekD03PY";
                var data = utils_1.utils.getPayload(jwt);
                console.log(data);
                return res.json({ message: "API Works!" });
            }
            catch (error) {
                return res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    insert(req, res) {
        try {
            // ! testing
            //throw new RangeError('Error inesperado');
            return res.json({
                message: "Insert Works!"
            });
        }
        catch (error) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
    update(req, res) {
        try {
            // ! testing
            //throw new RangeError('Error inesperado');
            return res.json({
                message: "Update Works!"
            });
        }
        catch (error) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
    delete(req, res) {
        try {
            // ! testing
            //throw new RangeError('Error inesperado');
            return res.json({
                message: "Delete Works!"
            });
        }
        catch (error) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
}
exports.indexController = new IndexController();
