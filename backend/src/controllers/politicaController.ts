import { Request, Response } from 'express';
import { PoliticaService } from '../services/politicaService'; 

export class PoliticaController {
  
  static async getAllPolicies(req: Request, res: Response) {
    const respuesta = await PoliticaService.getAllPolicies(req.headers);
    return res.status(respuesta.resultado).json(respuesta);
  }

  static async createPolicy(req: Request, res: Response) {
    const respuesta = await PoliticaService.createPolicy(req.body, req.headers);
    return res.status(respuesta.resultado).json(respuesta);
  }

  static async updatePolicy(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const respuesta = await PoliticaService.updatePolicy(id, req.body, req.headers);
    return res.status(respuesta.resultado).json(respuesta);
  }

  static async deletePolicy(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const respuesta = await PoliticaService.deletePolicy(id, req.headers);
    return res.status(respuesta.resultado).json(respuesta);
  }
}