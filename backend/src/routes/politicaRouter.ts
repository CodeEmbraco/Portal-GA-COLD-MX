import { Router } from 'express';
import { PoliticaController } from '../controllers/politicaController';

const politicarouter = Router();

politicarouter.get('/getAllPolicies', PoliticaController.getAllPolicies);

// GET /api/politica/:id
// politicarouter.get('/:id', PoliticaController.getPolicy);

// POST /api/politica
politicarouter.post('/createPolicy', PoliticaController.createPolicy);

// PUT /api/politica/:id
politicarouter.put('/updatePolicy/:id', PoliticaController.updatePolicy);

// DELETE /api/politica/:id
politicarouter.put('/deletePolicy/:id', PoliticaController.deletePolicy);

export default politicarouter;