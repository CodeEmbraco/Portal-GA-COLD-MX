CREATE DATABASE APP_WEB_PORTAL;
USE APP_WEB_PORTAL;

CREATE TABLE Entidad(
	Id	INT PRIMARY KEY IDENTITY(1,1),
	Planta VARCHAR(100) NOT NULL,
	Pais	VARCHAR(50) NOT NULL,
	Estado	VARCHAR(50) NOT NULL,
	Direccion VARCHAR(100) NOT NULL
);

CREATE TABLE Departamento(
	Id			INT PRIMARY KEY IDENTITY(1,1),
	Nombre		VARCHAR(100) NOT NULL,
	EntidadId	INT NOT NULL,
	--Descripcion VARCHAR(255) NULL, --Solo por si acaso
	CONSTRAINT fk_dpto_entidad FOREIGN KEY (EntidadId) REFERENCES Entidad(Id)
);

CREATE TABLE Rol(
	Id	INT PRIMARY KEY IDENTITY(1,1),
	Rol VARCHAR(50) NOT NULL,
	Descripcion VARCHAR(100) NOT NULL
)

CREATE TABLE Usuario(
	Id	INT PRIMARY KEY IDENTITY(1,1),
	Correo VARCHAR(50) NOT NULL,
	Contraseña	VARCHAR(260) NOT NULL,
	Usuario_ActiveDirectory VARCHAR(100) NOT NULL
);

CREATE TABLE Rol_Usuario(
	IdRol		INT NOT NULL,
	IdUsuario	INT NOT NULL,
	CONSTRAINT pk_rol_usuario PRIMARY KEY (IdRol,IdUsuario),	--Llave primaria compuesta
	CONSTRAINT fk_rol_asoc FOREIGN KEY (IdRol) REFERENCES Rol(Id),
	CONSTRAINT fk_usuario_asoc FOREIGN KEY (IdUsuario) REFERENCES Usuario(Id),
)

CREATE TABLE Departamento_Usuario(
	IdDepartamento	INT NOT NULL,
	IdUsuario		INT NOT NULL,
	CONSTRAINT pk_depto_usuario PRIMARY KEY (IdDepartamento,IdUsuario),	--Llave primaria compuesta
	CONSTRAINT fk_depto_asoc FOREIGN KEY (IdDepartamento) REFERENCES Departamento(Id),
	CONSTRAINT fk_usuario_asoc FOREIGN KEY (IdUsuario) REFERENCES Usuario(Id),
)

CREATE TABLE Politica(
	Id				INT PRIMARY KEY IDENTITY(1,1),
	Titulo			VARCHAR(255) NOT NULL,
	DepartamentoId	INT NOT NULL,
	SubidoPor		INT NOT NULL,
	FechaSubida		DATETIME2 NOT NULL,
	ModificadoPor	INT NOT NULL,
	FechaModificado	DATETIME NOT NULL,
	CONSTRAINT fk_politica_dpto FOREIGN KEY (DepartamentoId) REFERENCES Departamento(Id),
	CONSTRAINT fk_politica_usuario_subio FOREIGN KEY (SubidoPor) REFERENCES Usuario(Id),
	CONSTRAINT fk_politica_usuario_modif FOREIGN KEY (ModificadoPor) REFERENCES Usuario(Id)
);

CREATE TABLE Archivo(
	Id	INT PRIMARY KEY IDENTITY(1,1),
	Codigo VARCHAR(20) NOT NULL,
	PoliticaId INT NOT NULL,
	SubidoPor		INT NOT NULL,
	FechaSubida		DATETIME2 NOT NULL,
	ModificadoPor	INT NOT NULL,
	FechaModificado	DATETIME NOT NULL,
	CONSTRAINT unique_codigo UNIQUE (Codigo),
	CONSTRAINT fk_id_politica FOREIGN KEY (PoliticaId) REFERENCES Politica(Id),
	CONSTRAINT fk_archivo_usuario_subio FOREIGN KEY (SubidoPor) REFERENCES Usuario(Id),
	CONSTRAINT fk_archivo_usuario_modif FOREIGN KEY (ModificadoPor) REFERENCES Usuario(Id)
);

CREATE TABLE Versiones_Archivo(
	Id	INT PRIMARY KEY IDENTITY(1,1),
	ArchivoId INT NOT NULL,
	Ruta VARCHAR(200) NOT NULL,
	Version_ INT NOT NULL,
	Active BOOLEAN NOT NULL,
	SubidoPor		INT NOT NULL,
	FechaSubida		DATETIME2 NOT NULL,
	ModificadoPor	INT NOT NULL,
	FechaModificado	DATETIME NOT NULL,
	CONSTRAINT fk_id_archivo FOREIGN KEY (ArchivoId) REFERENCES Archivo(Id),
	CONSTRAINT fk_version_archivo_usuario_subio FOREIGN KEY (SubidoPor) REFERENCES Usuario(Id),
	CONSTRAINT fk_version_archivo_usuario_modif FOREIGN KEY (ModificadoPor) REFERENCES Usuario(Id)
);

/*
COMENATRIO DE PRUEBA
NOTAS:
	--> Estamos guardando la ruta 2 veces: Politica y Archivo. ¿Donde la dejamos para no repetir el dato?
	-

*/

