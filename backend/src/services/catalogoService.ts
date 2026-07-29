import { prisma } from "../lib/prisma";
import { ComboItem, Wrapper } from "../interfaces/interfaces";

export class CatalogoService {
  private static catalogoHandler: Record<string, (parentId?: number) => Promise<ComboItem[]>> = {
    
    'departamento': async () => {
      const departamentos = await prisma.departamento.findMany({
        select: {
          id: true,
          nombre: true
        }
      });

      return departamentos.map(d => ({
        value: d.id,
        label: d.nombre
      }));
    }
  };

static async getCatalog(catalogoParam: unknown, parentIdQuery: unknown): Promise<Wrapper<ComboItem>> {
    try {
      // 1. Extraer y limpiar el nombre del catálogo
      const catalogo = String(catalogoParam || '').toLowerCase().trim();
      
      // 2. Extraer y convertir parentId si viene en el query
      let parentId: number | undefined = undefined;
      if (parentIdQuery) {
        const parsed = parseInt(String(parentIdQuery), 10);
        if (!isNaN(parsed)) {
          parentId = parsed;
        }
      }

      // 3. Buscar el handler registrado
      const handler = this.catalogoHandler[catalogo];

      if (!handler) {
        return {
          resultado: 400,
          respuesta: `El catálogo '${catalogo}' no existe o no está registrado.`
        };
      }

      // 4. Ejecutar la consulta
      const listado = await handler(parentId);

      return {
        resultado: 200,
        respuesta: `Catálogo '${catalogo}' recuperado con éxito`,
        listado
      };

    } catch (error: any) {
      return {
        resultado: 500,
        respuesta: `Error al obtener el catálogo`,
        error: error.message
      };
    }
  }
}