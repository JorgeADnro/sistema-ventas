import { Request, Response } from "express";
import prisma from "../database/database";
import { utils } from "../utils/utils";

class AuthController {
  public async iniciarSesion(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      // Check if user exists
      const usuario = await prisma.usuario.findFirst({
        where: { username: username }
      });

      if (!usuario) {
        return res.status(404).json({ message: "El usuario o contraseña es incorrecto!" });
      }

      // Check if the password matches
      const isPasswordValid = await utils.checkPassword(password, usuario.password);
      if (!isPasswordValid) {
        return res.status(404).json({ message: "El usuario o contraseña es incorrecto!" });
      }

      // Exclude sensitive information and generate JWT
      const { password: _, fechaRegistro, ...newUser } = usuario;
      const token = utils.generateJWT(newUser);

      res.json({ message: "Autentificación correcta!", token: token });
    } catch (error: any) {
      console.error("Error during authentication:", error); // Log the error
      return res.status(500).json({ message: "Error interno" });
    }
  }

  sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

export const authController = new AuthController();
