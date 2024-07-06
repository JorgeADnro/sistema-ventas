import { Request, Response } from "express";
import prisma from "../database/database";
import { utils } from "../utils/utils";

class IndexController {

    public async index(req: Request, res: Response) {
        try {
            // ! testing
            //throw new RangeError('Error inesperado');

            const user = {
                cveUsuario: 1,
                nombre:"jose",
                rol: [1,2,3]
            };

            const token = utils.generateJWT(user);
            console.log(token);

            var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdmVVc3VhcmlvIjoxLCJub21icmUiOiJqb3NlIiwicm9sIjpbMSwyLDNdLCJpYXQiOjE3MjAyMjgxNDMsImV4cCI6MTcyMDIzMTc0M30.EEbSB2pce4zfs9qC8Rk11-i8L9AAm4oRfkIqekD03PY"
            var data = utils.getPayload(jwt);
            console.log(data);
            
            return res.json({message: "API Works!"});


        } catch (error:any) {
            return res.status(500).json({message: `Error: ${error.message}`});
        }
    }

    public insert(req: Request, res: Response) {
        try {
            // ! testing
            //throw new RangeError('Error inesperado');
            
            return res.json({
                message: "Insert Works!"
            });
        } catch (error:any) {
            return res.status(500).json({message: `Error: ${error.message}`});
        }
    }

    public update(req: Request, res: Response) {
        try {
            // ! testing
            //throw new RangeError('Error inesperado');
            
            return res.json({
                message: "Update Works!"
            });
        } catch (error:any) {
            return res.status(500).json({message: `Error: ${error.message}`});
        }
    }

    public delete(req: Request, res: Response) {
        try {
            // ! testing
            //throw new RangeError('Error inesperado');
            
            return res.json({
                message: "Delete Works!"
            });
        } catch (error:any) {
            return res.status(500).json({message: `Error: ${error.message}`});
        }
    }

}

export const indexController = new IndexController();