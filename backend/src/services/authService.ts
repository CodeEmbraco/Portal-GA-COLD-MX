import { prisma } from '../lib/prisma';
import { Wrapper } from '../interfaces/interfaces';

export class AuthService {
  static async login(email: string, password: string): Promise<Wrapper> {
    try {
      if (!email || !password) {
        return {
          resultado: 400, // Bad Request
          respuesta: 'El correo y la contraseña son obligatorios'
        };
      }

      //Buscamos al usuario por correo e INCLUIMOS sus relaciones directamente
      const usuario = await prisma.usuario.findUnique({
        where: {
          correo: email
        },
        include: {
          rol: true,          // Trae todos los objetos Rol asociados
          departamento: true  // Trae todos los objetos Departamento asociados
        }
      });

      //Si no existe el usuario
      if (!usuario) {
        return {
          resultado: 401, // Unauthorized
          respuesta: 'Credenciales inválidas (Usuario no encontrado)'
        };
      }

      //Validamos la contraseña
      // (Nota: En un ambiente de producción real usarías bcrypt.compare)
      if (usuario.contraseña !== password) {
        return {
          resultado: 401, // Unauthorized
          respuesta: 'Credenciales inválidas (Contraseña incorrecta)'
        };
      }

      //Quitamos la contraseña del objeto por seguridad antes de enviarlo
      const { contraseña: _, ...usuarioSinPassword } = usuario;

      //Retornamos la respuesta
      // Prisma ya formateó las propiedades 'rol' y 'departamento' dentro del objeto
      return {
        resultado: 200, // OK
        respuesta: 'Inicio de sesión exitoso',
        objeto: {
          usuario: usuarioSinPassword,
          // token: 'jwt_token_dummy_12345'
        },
      };

    } catch (error: any) {
      console.error('Error en AuthService.login:', error);
      return {
        resultado: 500, // Internal Server Error
        respuesta: 'Ocurrió un error inesperado en el servidor',
        error: error.message
      };
    }
  }
}