import { Request, Response } from "express";
import prisma from "../database/database";

class RolesController {
  async getRoles(req: Request, res: Response) {
    try {
      const roles = await prisma.rol.findMany({
        orderBy:{
          nombre: 'asc'
        }
      });
      res.json(roles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los roles" });
    }
  }

  async getUserRole(req: Request, res: Response) {
    const userId = +req.params.id;
    try {
      const userWithRoles = await prisma.usuario.findUnique({
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
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el rol del usuario" });
    }
  }
}

export const rolesController = new RolesController();
