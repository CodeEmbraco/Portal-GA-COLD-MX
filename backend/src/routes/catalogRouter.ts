import { Router } from 'express';
import { CatalogoController } from '../controllers/catalogoController';

const catalogoRouter = Router();
catalogoRouter.get('/:catalogo', CatalogoController.getCatalog);

export default catalogoRouter;