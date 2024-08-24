import { Router } from "express";
import { rolesController } from "../controllers/roles.controller";

const rolesRouter = Router();

rolesRouter.get("/roles", rolesController.getRoles);

rolesRouter.get("/roles/:id", rolesController.getUserRole);

export default rolesRouter;