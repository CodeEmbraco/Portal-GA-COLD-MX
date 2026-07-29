import { Request, Response } from 'express';
import { ArchivoService } from '../services/archivoService';

export class ArchivoController {
  
  // 1. OBTENER ARCHIVOS DE UNA POLÍTICA
  static async getFilesByPolicy(req: Request, res: Response): Promise<Response> {
    const respuesta = await ArchivoService.getFilesByPolicy(req.params.politicaId);
    return res.status(respuesta.resultado).json(respuesta);
  }

  // 2. CREAR NUEVO ARCHIVO
  static async createFile(req: Request, res: Response): Promise<Response> {
    // Si Multer guardó el archivo físico, tomamos req.file.filename para la ruta;
    // si no, dejamos req.body.ruta en caso de enviar datos directos.
    const rutaArchivo = req.file ? req.file.filename : req.body.ruta;

    const payload = {
      ...req.body,
      ruta: rutaArchivo
    };

    const respuesta = await ArchivoService.createFile(payload, req.headers);
    return res.status(respuesta.resultado).json(respuesta);
  }

  // 3. INACTIVAR / ELIMINAR ARCHIVO (Soft Delete)
  static async deleteFile(req: Request, res: Response): Promise<Response> {
    const respuesta = await ArchivoService.deleteFile(req.params.id, req.headers);
    return res.status(respuesta.resultado).json(respuesta);
  }
}