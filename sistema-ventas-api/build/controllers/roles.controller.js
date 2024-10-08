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
exports.rolesController = void 0;
const database_1 = __importDefault(require("../database/database"));
class RolesController {
    getRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield database_1.default.rol.findMany({
                    orderBy: {
                        nombre: 'asc'
                    }
                });
                res.json(roles);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error al obtener los roles" });
            }
        });
    }
    getUserRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = +req.params.id;
            try {
                const userWithRoles = yield database_1.default.usuario.findUnique({
                    where: { cveUsuario: userId },
                    include: {
                        roles: {
                            select: {
                                nombre: true,
                            },
                        },
                    },
                });
                if (userWithRoles) {
                    const roles = userWithRoles.roles.map(role => role.nombre);
                    res.json({ usuario: userWithRoles.nombre, roles: roles });
                }
                else {
                    res.status(404).json({ message: "Usuario no encontrado" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error al obtener el rol del usuario" });
            }
        });
    }
}
exports.rolesController = new RolesController();
