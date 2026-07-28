BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Usuario] (
    [id] INT NOT NULL IDENTITY(1,1),
    [correo] NVARCHAR(1000) NOT NULL,
    [contraseña] NVARCHAR(1000) NOT NULL,
    [usuarioActiveDirectory] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Usuario_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Usuario_correo_key] UNIQUE NONCLUSTERED ([correo])
);

-- CreateTable
CREATE TABLE [dbo].[Rol] (
    [id] INT NOT NULL IDENTITY(1,1),
    [rol] NVARCHAR(1000) NOT NULL,
    [descripcion] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Rol_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Departamento] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [entidadId] INT NOT NULL,
    CONSTRAINT [Departamento_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Entidad] (
    [id] INT NOT NULL IDENTITY(1,1),
    [planta] NVARCHAR(1000) NOT NULL,
    [pais] NVARCHAR(1000) NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    [direccion] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Entidad_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Politica] (
    [id] INT NOT NULL IDENTITY(1,1),
    [titulo] NVARCHAR(1000) NOT NULL,
    [departamentoId] INT NOT NULL,
    [subidoPor] INT NOT NULL,
    [fechaSubida] DATETIME2 NOT NULL CONSTRAINT [Politica_fechaSubida_df] DEFAULT CURRENT_TIMESTAMP,
    [modificadoPor] INT NOT NULL,
    [fechaModificado] DATETIME2 NOT NULL,
    [esPrivado] BIT NOT NULL CONSTRAINT [Politica_esPrivado_df] DEFAULT 1,
    [activo] BIT NOT NULL CONSTRAINT [Politica_activo_df] DEFAULT 1,
    CONSTRAINT [Politica_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Archivo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [codigo] NVARCHAR(1000) NOT NULL,
    [politicaId] INT NOT NULL,
    [subidoPor] INT NOT NULL,
    [fechaSubida] DATETIME2 NOT NULL CONSTRAINT [Archivo_fechaSubida_df] DEFAULT CURRENT_TIMESTAMP,
    [modificadoPor] INT NOT NULL,
    [fechaModificado] DATETIME2 NOT NULL,
    CONSTRAINT [Archivo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[VersionArchivo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [archivoId] INT NOT NULL,
    [ruta] NVARCHAR(1000) NOT NULL,
    [version] INT NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [VersionArchivo_active_df] DEFAULT 1,
    [subidoPor] INT NOT NULL,
    [fechaSubida] DATETIME2 NOT NULL CONSTRAINT [VersionArchivo_fechaSubida_df] DEFAULT CURRENT_TIMESTAMP,
    [modificadoPor] INT NOT NULL,
    [fechaModificado] DATETIME2 NOT NULL,
    CONSTRAINT [VersionArchivo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_RolToUsuario] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_RolToUsuario_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateTable
CREATE TABLE [dbo].[_DepartamentoToUsuario] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_DepartamentoToUsuario_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_RolToUsuario_B_index] ON [dbo].[_RolToUsuario]([B]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_DepartamentoToUsuario_B_index] ON [dbo].[_DepartamentoToUsuario]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[Departamento] ADD CONSTRAINT [Departamento_entidadId_fkey] FOREIGN KEY ([entidadId]) REFERENCES [dbo].[Entidad]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Politica] ADD CONSTRAINT [Politica_departamentoId_fkey] FOREIGN KEY ([departamentoId]) REFERENCES [dbo].[Departamento]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Politica] ADD CONSTRAINT [Politica_subidoPor_fkey] FOREIGN KEY ([subidoPor]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Politica] ADD CONSTRAINT [Politica_modificadoPor_fkey] FOREIGN KEY ([modificadoPor]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Archivo] ADD CONSTRAINT [Archivo_politicaId_fkey] FOREIGN KEY ([politicaId]) REFERENCES [dbo].[Politica]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Archivo] ADD CONSTRAINT [Archivo_subidoPor_fkey] FOREIGN KEY ([subidoPor]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Archivo] ADD CONSTRAINT [Archivo_modificadoPor_fkey] FOREIGN KEY ([modificadoPor]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[VersionArchivo] ADD CONSTRAINT [VersionArchivo_archivoId_fkey] FOREIGN KEY ([archivoId]) REFERENCES [dbo].[Archivo]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VersionArchivo] ADD CONSTRAINT [VersionArchivo_subidoPor_fkey] FOREIGN KEY ([subidoPor]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[VersionArchivo] ADD CONSTRAINT [VersionArchivo_modificadoPor_fkey] FOREIGN KEY ([modificadoPor]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_RolToUsuario] ADD CONSTRAINT [_RolToUsuario_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Rol]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_RolToUsuario] ADD CONSTRAINT [_RolToUsuario_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Usuario]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_DepartamentoToUsuario] ADD CONSTRAINT [_DepartamentoToUsuario_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Departamento]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_DepartamentoToUsuario] ADD CONSTRAINT [_DepartamentoToUsuario_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Usuario]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
