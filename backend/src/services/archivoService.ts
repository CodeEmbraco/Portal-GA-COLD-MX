import { prisma } from "../lib/prisma";
import { Wrapper, UsuarioToken } from "../interfaces/interfaces";
import { Archivo } from "../generated/prisma";
import { IncomingHttpHeaders } from "http";

export class ArchivoService {

  private static obtenerUsuarioDesdeHeaders(headers: IncomingHttpHeaders): UsuarioToken | undefined {
    try {
      const headerUsuario = headers['x-user-data'] as string;
      return headerUsuario ? JSON.parse(headerUsuario) : undefined;
    } catch {
      return undefined;
    }
  }

  static async getFilesByPolicy(politicaIdParam: unknown): Promise<Wrapper<Archivo>> {
    try {
      const politicaId = parseInt(String(politicaIdParam), 10);
      if (isNaN(politicaId)) {
        return { resultado: 400, respuesta: 'El ID de la política no es válido' };
      }

      const archivos = await prisma.archivo.findMany({
        where: {
          politicaId,
          activo: true
        }
      });

      return {
        resultado: 200,
        respuesta: 'Archivos recuperados con éxito',
        listado: archivos
      };
    } catch (error: any) {
      return { resultado: 500, respuesta: 'Error al obtener archivos', error: error.message };
    }
  }

  static async createFile(body: any, headers: IncomingHttpHeaders): Promise<Wrapper<Archivo>> {
    try {
      const usuario = this.obtenerUsuarioDesdeHeaders(headers);
      if (!usuario) return { resultado: 401, respuesta: 'No estás autenticado' };

      const { codigo, politicaId, ruta } = body || {};
      const idPolitica = parseInt(String(politicaId), 10);

      if (!codigo || isNaN(idPolitica)) {
        return { resultado: 400, respuesta: 'Faltan campos obligatorios (codigo, politicaId)' };
      }

      if (!ruta) {
        return { resultado: 400, respuesta: 'El archivo físico no se procesó correctamente en el servidor' };
      }
      const nuevoArchivo = await prisma.archivo.create({
        data: {
          codigo,
          politicaId: idPolitica,
          ruta,
          subidoPor: usuario.id,
          modificadoPor: usuario.id
        }
      });

      return { resultado: 201, respuesta: 'Archivo registrado con éxito', objeto: nuevoArchivo };
    } catch (error: any) {
      return { resultado: 500, respuesta: 'Error al registrar el archivo', error: error.message };
    }
  }

  static async deleteFile(idParam: unknown, headers: IncomingHttpHeaders): Promise<Wrapper<Archivo>> {
    try {
      const usuario = this.obtenerUsuarioDesdeHeaders(headers);
      if (!usuario) return { resultado: 401, respuesta: 'No estás autenticado' };

      const id = parseInt(String(idParam), 10);
      if (isNaN(id)) return { resultado: 400, respuesta: 'El ID del archivo no es válido' };

      const archivoInactivado = await prisma.archivo.update({
        where: { id },
        data: {
          activo: false,
          modificadoPor: usuario.id
        }
      });

      return { resultado: 200, respuesta: 'Archivo desactivado con éxito', objeto: archivoInactivado };
    } catch (error: any) {
      return { resultado: 500, respuesta: 'Error al desactivar el archivo', error: error.message };
    }
  }
}