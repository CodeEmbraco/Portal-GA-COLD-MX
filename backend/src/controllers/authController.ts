import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  
  static async login(req: Request, res: Response) {
    const { correo, contraseña } = req.body;
    const respuestaServicio = await AuthService.login(correo, contraseña);
    return res.status(respuestaServicio.resultado).json(respuestaServicio);
  }
}