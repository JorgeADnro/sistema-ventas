import prisma from "../database/database";
import { Request, Response } from "express";

class GeneralController {
    async listarRoles(req: Request, res: Response){
        try {
            const roles = await prisma.rol.findMany();
            res.json(roles);
        }catch(error:any){
            return res.status(500).json({message: `${error.message}`});
        }
    }
}

export const generalController = new GeneralController();