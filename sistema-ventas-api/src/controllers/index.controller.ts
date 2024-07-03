import { Request, Response } from "express";
import prisma from "../database/database";

class IndexController {

    public async index(req: Request, res: Response) {
        try {
            // ! testing
            //throw new RangeError('Error inesperado');

            const newUser = await prisma.usuario.create({
                data: {
                    nombre: 'Jorge',
                    apellidos: 'Ayala',
                    username: 'JorgeA',
                    password: 'linux123'
                }
            })

            const usuarios = await prisma.usuario.findMany();
            const deletedUser = await prisma.usuario.delete({
                where: {cveUsuario: newUser.cveUsuario}
            })

            return res.json(usuarios);
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