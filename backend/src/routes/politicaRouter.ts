import { Router } from 'express';
import { PoliticaController } from '../controllers/politicaController';

const politicarouter = Router();

politicarouter.get('/', PoliticaController.getAllPolicies);

// GET /api/politica/:id
// politicarouter.get('/:id', PoliticaController.getPolicy);

// POST /api/politica
politicarouter.post('/', PoliticaController.createPolicy);

// PUT /api/politica/:id
politicarouter.put('/:id', PoliticaController.updatePolicy);

// DELETE /api/politica/:id
politicarouter.delete('/:id', PoliticaController.deletePolicy);

export default politicarouter;