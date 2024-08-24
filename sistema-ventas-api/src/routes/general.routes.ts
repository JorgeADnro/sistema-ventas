import { Router } from "express";
import { jwtCheck } from "../middlewares/jwt.check";
import { generalController } from "../controllers/general.controller";

class GeneralRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.config();
    }

    private config() {
        this.router.get('/roles',[], generalController.listarRoles);
    }
}

const generalRoutes = new GeneralRoutes();
export default generalRoutes.router;