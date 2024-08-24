"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const usuario_rules_1 = require("../rules/usuario.rules");
const usuarioRouter = (0, express_1.Router)();
usuarioRouter.post("/usuarios", (0, usuario_rules_1.usuarioRules)(), usuario_controller_1.usuarioController.createUsuario);
usuarioRouter.get("/usuarios", usuario_controller_1.usuarioController.getUsuarios);
usuarioRouter.get("/usuarios/:id", usuario_controller_1.usuarioController.getUsuario);
usuarioRouter.put("/usuarios/:id", usuario_controller_1.usuarioController.updateUsuario);
usuarioRouter.delete("/usuarios/:id", usuario_controller_1.usuarioController.deleteUsuario);
exports.default = usuarioRouter;
