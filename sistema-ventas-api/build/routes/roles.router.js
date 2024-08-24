"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_controller_1 = require("../controllers/roles.controller");
const rolesRouter = (0, express_1.Router)();
rolesRouter.get("/roles", roles_controller_1.rolesController.getRoles);
rolesRouter.get("/roles/:id", roles_controller_1.rolesController.getUserRole);
exports.default = rolesRouter;
