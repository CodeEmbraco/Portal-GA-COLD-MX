import { Router } from 'express';
import { ArchivoController } from '../controllers/archivoController';
import { upload } from '../middlewares/uploadMiddleware';

const archivoRouter = Router();

// GET /api/archivo/politica/5
archivoRouter.get('/getFilesByPolicy/:politicaId', ArchivoController.getFilesByPolicy);

// POST /api/archivo (El middleware 'upload.single' procesa el campo de archivo 'archivo')
archivoRouter.post('/uploadFile', upload.single('archivo'), ArchivoController.createFile);

// DELETE /api/archivo/12
archivoRouter.put('/deleteFile/:id', ArchivoController.deleteFile);

export default archivoRouter;