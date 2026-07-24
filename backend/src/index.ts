import express, { Request, Response } from 'express';

const app = express();
const puerto = 4000;

// Tu primera ruta (Endpoint)
app.get('/', (req: Request, res: Response) => {
  res.json({ mensaje: "¡Hola! Mi servidor Express con TypeScript funciona perfectamente." });
});

app.listen(puerto, () => {
  console.log(`🚀 Servidor encendido y escuchando en http://localhost:${puerto}`);
});