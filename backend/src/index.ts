import express, { Request, Response } from 'express';
// 1. Importamos el archivo de rutas (asegúrate de que el nombre del archivo coincida con el tuyo)
import routes from './routes';
const app = express();
const puerto = 4000;

// 2. ¡MUY IMPORTANTE! Esto permite que Express entienda el `req.body` en formato JSON
app.use(express.json());

// Tu ruta de prueba original
app.get('/', (req: Request, res: Response) => {
  res.json({ mensaje: "¡Hola! Mi servidor Express con TypeScript funciona perfectamente." });
});

// 3. Registramos tus rutas de autenticación bajo el prefijo '/api/auth'
app.use('/api/auth', routes);

app.listen(puerto, () => {
  console.log(`🚀 Servidor encendido y escuchando en http://localhost:${puerto}`);
});