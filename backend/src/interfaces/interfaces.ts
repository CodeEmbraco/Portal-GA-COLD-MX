export interface Wrapper<T = any> {
  resultado: number;           // Ej: 200 (OK), 400 (Bad Request), 500 (Error interno)
  objeto?: T | null;           // Para devolver un solo registro
  listado?: T[] | null;        // Para devolver una lista o arreglo
  objetoId?: number;           // Para devolver el ID del objeto (no aplica para listado)
  respuesta: string;           // El mensaje descriptivo ("Éxito", "No encontrado", etc.)
  error?: any;                 // Detalles del error (solo si algo explota)
}

export interface UsuarioToken {
  id: number;
  departamentoId: number;
  rol: string;
}

export interface ComboItem{
  value: string | number;
  label: string;  
}