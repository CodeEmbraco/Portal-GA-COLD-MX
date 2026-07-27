import { Router } from 'express';
import { AuthController } from './controllers/authController';

const router = Router();

// La ruta solo conecta la URL con el método del controlador
router.post('/login', AuthController.login);

export default router;