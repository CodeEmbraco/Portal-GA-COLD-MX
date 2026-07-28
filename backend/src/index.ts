import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from 'cors';
import politicaRouter from './routes/politicaRouter';
import authRouter from './routes/authrouter';
const app = express();
const puerto = 4000;

// Configuración de CORS: Nos permite recibir peticiones desde el frontend de nuestro puerto especifico
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','x-user-data']
}));

//Esto permite que Express entienda el `req.body` en formato JSON
app.use(express.json());

//ruta de prueba original
app.get('/', (req: Request, res: Response) => {
  res.json({ mensaje: "¡Hola! Mi servidor Express con TypeScript funciona perfectamente." });
});

// registro de rutas'
app.use('/api/auth', authRouter);
app.use('/api/politica', politicaRouter);

app.listen(puerto, () => {
  console.log(`🚀 Servidor encendido y escuchando en http://localhost:${puerto}`);
});