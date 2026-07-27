export interface Notificacion<T = any> {
  resultado: number;           // Ej: 200 (OK), 400 (Bad Request), 500 (Error interno)
  objeto?: T | null;           // Para cuando devuelves un solo registro
  listado?: T[] | null;        // Para cuando devuelves una lista o arreglo
  objetoId?: number;           // Para devolver el ID de algo recién insertado/editado
  respuesta: string;           // El mensaje descriptivo ("Éxito", "No encontrado", etc.)
  error?: any;                 // Detalles del error (solo si algo explota)
}