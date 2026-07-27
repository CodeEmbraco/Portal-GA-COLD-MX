import { 
  usuariosDummy, 
  rolesDummy, 
  departamentosDummy, 
  usuarioRolesDummy, 
  usuarioDepartamentosDummy 
} from '../dummies';
import { Wrapper } from '../interfaces/interfaces';

export class AuthService {
  // Lógica de negocio para validar el login
  static async login(email: string, password: string): Promise<Wrapper> {
    try{
        if (!email || !password) {
            return {
            resultado: 400, // Bad Request
            respuesta: 'El correo y la contraseña son obligatorios'
            };
        }

        // 1. Buscar al usuario
        const usuario = usuariosDummy.find(u => u.correo === email);

        if (!usuario) {
            return {
            resultado: 401, // Unauthorized
            respuesta: 'Credenciales inválidas (Usuario no encontrado)'
            };
        }

        if (usuario.contraseña !== password) {
            return {
            resultado: 401, // Unauthorized
            respuesta: 'Credenciales inválidas (Contraseña incorrecta)'
            };
        }

        // 2. Buscar los roles asociados a este usuario
        // Primero obtenemos solo los IDs de los roles que le pertenecen
        const rolesDelUsuarioIds = usuarioRolesDummy
        .filter(ur => ur.usuarioId === usuario.id)
        .map(ur => ur.rolId);

        // Luego buscamos los objetos completos de esos roles
        const roles = rolesDummy.filter(r => rolesDelUsuarioIds.includes(r.id));

        // 3. Buscar los departamentos asociados a este usuario
        // Mismo proceso: obtenemos IDs y luego los objetos completos
        const departamentosIds = usuarioDepartamentosDummy
        .filter(ud => ud.usuarioId === usuario.id)
        .map(ud => ud.departamentoId);

        const departamentos = departamentosDummy.filter(d => departamentosIds.includes(d.id));

        // 4. Quitamos la contraseña por seguridad
        const { contraseña: _, ...usuarioSinPassword } = usuario;
        
        // 5. Armamos el objeto final fusionando los datos
        const usuarioConRelaciones = {
        ...usuarioSinPassword,
        roles: roles,
        departamentos: departamentos
        };
        
        // 6. Retornamos la respuesta
        return {
            resultado: 200, // OK
            respuesta: 'Inicio de sesión exitoso',
            objeto: {
            usuario: usuarioConRelaciones,
            //   token: 'jwt_token_dummy_12345'
            },
        };

        } catch (error: any) {
        // Si ocurre un error grave (se cae la base de datos), lo atrapamos aquí
        return {
            resultado: 500, // Internal Server Error
            respuesta: 'Ocurrió un error inesperado en el servidor',
            error: error.message
            };
        }
    }
}
