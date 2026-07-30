import { Wrapper, UsuarioToken } from "../interfaces/interfaces";
import {Politica } from '../generated/prisma';
import { prisma } from "../lib/prisma";
import { IncomingHttpHeaders } from "node:http";

export class PoliticaService {

  private static obtenerUsuarioDesdeHeaders(headers: IncomingHttpHeaders): UsuarioToken | undefined {
      try {
        const headerUsuario = headers['x-user-data'] as string;
        return headerUsuario ? JSON.parse(headerUsuario) : undefined;
      } catch {
        return undefined; // Si el JSON del header viene mal formado
      }
    }
  
  // 1. READ ALL (Obtener todas)
  static async getAllPolicies(headers: IncomingHttpHeaders): Promise<Wrapper<Politica>> {
    try {
      const usuarioActual = this.obtenerUsuarioDesdeHeaders(headers);
      const condiciones: any = { activo: true };

      if (usuarioActual) {
        const esAdmin = usuarioActual.rol === 'Admin'; 
        if (!esAdmin) {
          condiciones.OR = [
            { esPrivado: false },
            { departamentoId: usuarioActual.departamentoId }
          ];
        }
      } else {
        condiciones.esPrivado = false;
      }

      const politicas = await prisma.politica.findMany({
        where: condiciones,
        include: {
          departamento: true,
          archivos: {
            where: { activo: true },
            orderBy: { fechaSubida: 'desc' }
          }
        }
      });

      return {
        resultado: 200,
        respuesta: 'Políticas recuperadas con éxito',
        listado: politicas
      };
    } catch (error: any) {
      return { resultado: 500, respuesta: 'Error al obtener políticas', error: error.message };
    }
  }

  // // 2. READ ONE (Obtener por ID)
  // static async getPolicy(id: number, usuarioActual?: UsuarioToken): Promise<Wrapper<Politica>> {
  //   try {        
  //     if (isNaN(id)) return { resultado: 400, respuesta: 'El ID proporcionado no es válido' };

  //     const politica = await prisma.politica.findFirst({
  //       where: { id: id, activo: true },
  //       include: { departamento: true }
  //     });

  //     if (!politica) {
  //       return { resultado: 404, respuesta: 'Política no encontrada' };
  //     }

  //     // Validar si es privada y el usuario no tiene acceso (lógica opcional de seguridad)
  //     if (politica.esPrivado) {
  //       if (!usuarioActual) return { resultado: 403, respuesta: 'Acceso denegado. Debes iniciar sesión.' };
  //       if (usuarioActual.rol !== 'Admin' && politica.departamentoId !== usuarioActual.departamentoId) {
  //         return { resultado: 403, respuesta: 'No tienes permiso para ver esta política privada.' };
  //       }
  //     }

  //     return { resultado: 200, respuesta: 'Política recuperada', objeto: politica };
  //   } catch (error: any) {
  //     return { resultado: 500, respuesta: 'Error al obtener la política', error: error.message };
  //   }
  // }

  // 3. CREATE (Crear)
  static async createPolicy(datos: Partial<Politica>, headers: IncomingHttpHeaders): Promise<Wrapper<Politica>> {
    try {
      const usuarioActual = this.obtenerUsuarioDesdeHeaders(headers);

      if (!usuarioActual) {
        return { resultado: 401, respuesta: 'Debes iniciar sesión para crear una política' };
      }

      const { titulo, departamentoId, esPrivado } = datos;
      
      if (!titulo || !departamentoId) {
        return { resultado: 400, respuesta: 'Faltan campos obligatorios (titulo, departamentoId)' };
      }

      const nuevaPolitica = await prisma.politica.create({
        data: {
          titulo: titulo,
          departamentoId: departamentoId,
          esPrivado: esPrivado ?? true,
          subidoPor: usuarioActual.id,
          modificadoPor: usuarioActual.id    
        }
      });

      return { resultado: 201, respuesta: 'Política creada con éxito', objetoId: nuevaPolitica.id, objeto: nuevaPolitica };
    } catch (error: any) {
      return { resultado: 500, respuesta: 'Error al crear la política', error: error.message };
    }
  }

  // 4. UPDATE (Actualizar)
  static async updatePolicy(id: number, datos: Partial<Politica>, headers: IncomingHttpHeaders): Promise<Wrapper<Politica>> {
    try {
      const usuarioActual = this.obtenerUsuarioDesdeHeaders(headers);

      if (!usuarioActual) {
        return { resultado: 401, respuesta: 'Debes iniciar sesión para actualizar una política' };
      }     

      if (isNaN(id)) return { resultado: 400, respuesta: 'El ID proporcionado no es válido' };

      const existe = await prisma.politica.findFirst({ where: { id, activo: true } });
      if (!existe) return { resultado: 404, respuesta: 'Política no encontrada para actualizar' };

      const { titulo, departamentoId, esPrivado } = datos;

      const politicaActualizada = await prisma.politica.update({
        where: { id },
        data: {
          ...(titulo && { titulo }),
          ...(departamentoId && { departamentoId }),
          ...(esPrivado !== undefined && { esPrivado }),
          modificadoPor: usuarioActual.id
        }
      });

      return { resultado: 200, respuesta: 'Política actualizada con éxito', objeto: politicaActualizada };
    } catch (error: any) {
      return { resultado: 500, respuesta: 'Error al actualizar', error: error.message };
    }
  }

  // 5. DELETE (Eliminar Lógico)
  static async deletePolicy(id: number, headers: IncomingHttpHeaders): Promise<Wrapper> {
    try {
      const usuarioActual = this.obtenerUsuarioDesdeHeaders(headers);

      if (!usuarioActual) {
        return { resultado: 401, respuesta: 'Debes iniciar sesión para eliminar una política' };
      }

      if (isNaN(id)) return { resultado: 400, respuesta: 'El ID proporcionado no es válido' };

      const existe = await prisma.politica.findFirst({ where: { id, activo: true } });
      
      if (!existe) {
        return { resultado: 404, respuesta: 'Política no encontrada o ya estaba eliminada' };
      }

      if (usuarioActual.rol !== 'Admin' && existe.subidoPor !== usuarioActual.id) {
        return { 
          resultado: 403, 
          respuesta: 'Acceso denegado. Solo un administrador o el autor original pueden eliminar esta política.' 
        };
      }

      await prisma.politica.update({
        where: { id },
        data: { 
          activo: false,
          modificadoPor: usuarioActual.id
        }
      });

      return { resultado: 200, respuesta: 'Política eliminada correctamente' };
    } catch (error: any) {
      return { resultado: 500, respuesta: 'Error al eliminar', error: error.message };
    }
  }
}