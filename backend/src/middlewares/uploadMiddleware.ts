import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Apunta a la carpeta /uploads en la raíz del backend (fuera de /src)
const uploadDir = path.join(__dirname, '../../uploads');

// Garantiza que la carpeta /uploads exista
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir); // Guardará los archivos en backend/uploads/
  },
  filename: (_req, file, cb) => {
    // Genera un nombre único para evitar sobreescribir archivos con el mismo nombre
    const timestamp = Date.now();
    const nombreLimpio = file.originalname.replace(/\s+/g, '_');
    cb(null, `${timestamp}-${nombreLimpio}`);
  }
});

export const upload = multer({ storage });