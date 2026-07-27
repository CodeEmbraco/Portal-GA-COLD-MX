import { Usuario, Rol, Departamento, Entidad, Politica,Archivo,VersionArchivo } from "./generated/prisma";

export const rolesDummy: Rol[] =[
    { id: 1, rol: 'Admin', descripcion: 'Administrador del sistema' },
    { id: 2, rol: 'Auditor', descripcion: 'Solo lectura y revisión' },
    { id: 3, rol: 'SuperAdmin', descripcion: 'SuperAdmin' },
];

export const entidadesDummy: Entidad[] = [
  {
    id: 1,
    planta: 'Planta Monterrey',
    pais: 'México',
    estado: 'Nuevo León',
    direccion: 'Av. Industrial 123',
  },
];

export const departamentosDummy: Departamento[] = [
  { id: 1, nombre: 'Recursos Humanos', entidadId: 1 },
  { id: 2, nombre: 'IT', entidadId: 1 },
];

export const usuariosDummy: Usuario[] = [
  {
    id: 1,
    correo: 'admin@empresa.com',
    contraseña: '123',
    usuarioActiveDirectory: 'admin_user',
  },
  {
    id: 2,
    correo: 'juan.perez@empresa.com',
    contraseña: '456',
    usuarioActiveDirectory: 'jperez',
  },
];


// 1. Declaramos interfaces simples para las tablas de cruce
export interface UsuarioRolDummy {
  usuarioId: number;
  rolId: number;
}

export interface UsuarioDepartamentoDummy {
  usuarioId: number;
  departamentoId: number;
}

// 2. Llenamos las relaciones
export const usuarioRolesDummy: UsuarioRolDummy[] = [
  { usuarioId: 1, rolId: 1 }, // El Admin (1) tiene el rol de Administrador (1)
  { usuarioId: 2, rolId: 2 }, // Juan Perez (2) tiene el rol de Auditor (2)
];

export const usuarioDepartamentosDummy: UsuarioDepartamentoDummy[] = [
  { usuarioId: 1, departamentoId: 2 }, // El Admin (1) está en IT (2)
  { usuarioId: 2, departamentoId: 1 }, // Juan Perez (2) está en RH (1)
];

export const politicasDummy: Politica[] = [
  {
    id: 1,
    titulo: 'Política de Seguridad de la Información',
    departamentoId: 2, // Sistemas / IT
    subidoPor: 1,      // Admin
    fechaSubida: new Date(),
    modificadoPor: 1,
    fechaModificado: new Date(),
    esPrivado: true
  },
];


export const archivosDummy: Archivo[] = [
  {
    id: 1,
    codigo: 'POL-IT-001',
    politicaId: 1,
    subidoPor: 1,
    fechaSubida: new Date(),
    modificadoPor: 1,
    fechaModificado: new Date(),
  },
];

export const versionesDummy: VersionArchivo[] = [
  {
    id: 1,
    archivoId: 1,
    ruta: '/uploads/politicas/POL-IT-001_v1.pdf',
    version: 1,
    active: true,
    subidoPor: 1,
    fechaSubida: new Date(),
    modificadoPor: 1,
    fechaModificado: new Date(),
  },
];