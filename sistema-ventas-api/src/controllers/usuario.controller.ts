import { Request, Response } from "express";
import prisma from "../database/database";
import { utils } from "../utils/utils";

class UsuarioController {
  async createUsuario(req: Request, res: Response) {
    try {
      const { nombre, apellidos, username, email, password, rol } = req.body;
      const hashedPassword: string = (await utils.hashPassword(password)).toString();
  
      // Convert rol values to integers
      const rolIds = rol.map((id: string) => parseInt(id, 10));
  
      // Log the rolIds to verify their types
      console.log("rolIds:", rolIds);
  
      const rolesExistentes = await prisma.rol.findMany({
        where: { id: { in: rolIds } }
      });
  
      if (rolesExistentes.length !== rolIds.length) {
        return res.status(400).json({ message: "Uno o más roles no son válidos" });
      }
  
      const usuario = await prisma.usuario.create({
        data: {
          nombre,
          apellidos,
          username,
          email,
          password: hashedPassword,
          roles: {
            connect: rolIds.map((roleId: number) => ({ id: roleId }))
          }
        },
        include: {
          roles: true,
        }
      });
  
      res.status(201).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear usuario" });
    }
  }
  


  async getUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await prisma.usuario.findMany({
        include: {
          roles: true,
        }
      });
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener usuarios" });
    }
  }

  async getUsuario(req: Request, res: Response) {
    try {
      const cveUsuario = parseInt(req.params.id);
      const usuario = await prisma.usuario.findUnique({
        where: { cveUsuario },
        include: {
          roles: true,
        }
      });
      if (!usuario) {
        res.status(404).json({ message: "Usuario no encontrado" });
      } else {
        res.json(usuario);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener usuario" });
    }
  }

  async updateUsuario(req: Request, res: Response) {
    try {
      const cveUsuario = parseInt(req.params.id);
      const { nombre, apellidos, username, email, rol } = req.body;

      const rolesExistentes = await prisma.rol.findMany({
        where: { id: { in: rol } }
      });

      if (rolesExistentes.length !== rol.length) {
        return res.status(400).json({ message: "Uno o más roles no son válidos" });
      }

      const usuario = await prisma.usuario.update({
        where: { cveUsuario },
        data: {
          nombre,
          apellidos,
          username,
          email,
          roles: {
            set: rol.map((roleId: number) => ({ id: roleId }))
          }
        },
        include: {
          roles: true,
        }
      });

      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar usuario" });
    }
  }

  async deleteUsuario(req: Request, res: Response) {
    try {
      const cveUsuario = parseInt(req.params.id);
      await prisma.usuario.delete({
        where: { cveUsuario }
      });
      res.status(204).json({ message: "Usuario eliminado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar usuario" });
    }
  }
}

export const usuarioController = new UsuarioController();
