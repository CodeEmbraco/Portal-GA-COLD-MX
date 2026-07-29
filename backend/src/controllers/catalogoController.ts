import { Request, Response } from 'express';
import { CatalogoService } from '../services/catalogoService';

export class CatalogoController {
  
  static async getCatalog(req: Request, res: Response) {
    const respuesta = await CatalogoService.getCatalog(req.params.catalogo, req.query.parentId);
    return res.status(respuesta.resultado).json(respuesta);
  }
}