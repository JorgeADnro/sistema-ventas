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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const database_1 = __importDefault(require("../database/database"));
const utils_1 = require("../utils/utils");
class UsuarioController {
    createUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, apellidos, username, email, password, rol } = req.body;
                const hashedPassword = (yield utils_1.utils.hashPassword(password)).toString();
                // Convert rol values to integers
                const rolIds = rol.map((id) => parseInt(id, 10));
                // Log the rolIds to verify their types
                console.log("rolIds:", rolIds);
                const rolesExistentes = yield database_1.default.rol.findMany({
                    where: { id: { in: rolIds } }
                });
                if (rolesExistentes.length !== rolIds.length) {
                    return res.status(400).json({ message: "Uno o más roles no son válidos" });
                }
                const usuario = yield database_1.default.usuario.create({
                    data: {
                        nombre,
                        apellidos,
                        username,
                        email,
                        password: hashedPassword,
                        roles: {
                            connect: rolIds.map((roleId) => ({ id: roleId }))
                        }
                    },
                    include: {
                        roles: true,
                    }
                });
                res.status(201).json(usuario);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error al crear usuario" });
            }
        });
    }
    getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield database_1.default.usuario.findMany({
                    include: {
                        roles: true,
                    }
                });
                res.json(usuarios);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error al obtener usuarios" });
            }
        });
    }
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cveUsuario = parseInt(req.params.id);
                const usuario = yield database_1.default.usuario.findUnique({
                    where: { cveUsuario },
                    include: {
                        roles: true,
                    }
                });
                if (!usuario) {
                    res.status(404).json({ message: "Usuario no encontrado" });
                }
                else {
                    res.json(usuario);
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error al obtener usuario" });
            }
        });
    }
    updateUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cveUsuario = parseInt(req.params.id);
                const { nombre, apellidos, username, email, rol } = req.body;
                const rolesExistentes = yield database_1.default.rol.findMany({
                    where: { id: { in: rol } }
                });
                if (rolesExistentes.length !== rol.length) {
                    return res.status(400).json({ message: "Uno o más roles no son válidos" });
                }
                const usuario = yield database_1.default.usuario.update({
                    where: { cveUsuario },
                    data: {
                        nombre,
                        apellidos,
                        roles: {
                            set: rol.map((roleId) => ({ id: roleId }))
                        }
                    },
                    include: {
                        roles: true,
                    }
                });
                res.json(usuario);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error al actualizar usuario" });
            }
        });
    }
    deleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cveUsuario = parseInt(req.params.id);
                yield database_1.default.usuario.delete({
                    where: { cveUsuario }
                });
                res.status(204).json({ message: "Usuario eliminado" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error al eliminar usuario" });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
