import { Request, Response } from 'express';
import { AuthService } from '../services/authServices';

export class AuthController {
  
  static async login(req: Request, res: Response) {
    // 1. Extraer datos (pueden venir vacíos, el servicio se encarga)
    const { correo, contraseña } = req.body;

    // 2. Enviar directamente al servicio
    const respuestaServicio = await AuthService.login(correo, contraseña);

    // 3. Responder al cliente usando el estatus y el contrato que armó el servicio
    return res.status(respuestaServicio.resultado).json(respuestaServicio);
  }
}