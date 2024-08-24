import { Router } from "express";
import { usuarioController } from "../controllers/usuario.controller";
import { usuarioRules } from "../rules/usuario.rules";

const usuarioRouter = Router();

usuarioRouter.post("/usuarios", usuarioRules(), usuarioController.createUsuario);

usuarioRouter.get("/usuarios", usuarioController.getUsuarios);

usuarioRouter.get("/usuarios/:id", usuarioController.getUsuario);

usuarioRouter.put("/usuarios/:id", usuarioController.updateUsuario);

usuarioRouter.delete("/usuarios/:id", usuarioController.deleteUsuario);

export default usuarioRouter;