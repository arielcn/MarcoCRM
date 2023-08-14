USE [master]
GO
/****** Object:  Database [MarCo]    Script Date: 14/8/2023 12:07:40 ******/
CREATE DATABASE [MarCo]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MarCo', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\MarCo.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MarCo_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\MarCo_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [MarCo] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MarCo].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MarCo] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MarCo] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MarCo] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MarCo] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MarCo] SET ARITHABORT OFF 
GO
ALTER DATABASE [MarCo] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MarCo] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MarCo] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MarCo] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MarCo] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MarCo] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MarCo] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MarCo] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MarCo] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MarCo] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MarCo] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MarCo] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MarCo] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MarCo] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MarCo] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MarCo] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MarCo] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MarCo] SET RECOVERY FULL 
GO
ALTER DATABASE [MarCo] SET  MULTI_USER 
GO
ALTER DATABASE [MarCo] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MarCo] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MarCo] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MarCo] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MarCo] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'MarCo', N'ON'
GO
ALTER DATABASE [MarCo] SET QUERY_STORE = OFF
GO
USE [MarCo]
GO
/****** Object:  User [MarCo]    Script Date: 14/8/2023 12:07:40 ******/
CREATE USER [MarCo] FOR LOGIN [MarCo] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 14/8/2023 12:07:40 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [MarCo]
GO
/****** Object:  Table [dbo].[Clientes]    Script Date: 14/8/2023 12:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clientes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](150) NOT NULL,
	[Apellido] [varchar](150) NOT NULL,
	[Mail] [varchar](150) NOT NULL,
	[fkUsuario] [int] NOT NULL,
	[Telefono] [int] NOT NULL,
 CONSTRAINT [PK_Clientes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Empresa]    Script Date: 14/8/2023 12:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empresa](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [int] NOT NULL,
	[Cuit] [int] NOT NULL,
	[Nombre] [varchar](150) NOT NULL,
 CONSTRAINT [PK_Empresa] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Estado]    Script Date: 14/8/2023 12:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estado](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](150) NOT NULL,
 CONSTRAINT [PK_Estado] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notas]    Script Date: 14/8/2023 12:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nota] [varchar](max) NOT NULL,
	[fkReunion] [int] NOT NULL,
 CONSTRAINT [PK_Notas] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reuniones]    Script Date: 14/8/2023 12:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reuniones](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [varchar](150) NOT NULL,
	[Formato] [int] NOT NULL,
	[FechaYHora] [date] NOT NULL,
	[Color] [varchar](150) NOT NULL,
	[CodigoEmpresa] [int] NOT NULL,
	[Imagen] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Reuniones] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rol]    Script Date: 14/8/2023 12:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rol](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](150) NOT NULL,
 CONSTRAINT [PK_Rol] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 14/8/2023 12:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](150) NOT NULL,
	[Apellido] [varchar](150) NOT NULL,
	[Contraseña] [varchar](150) NOT NULL,
	[Mail] [varchar](150) NOT NULL,
	[CodigoEmpresa] [int] NULL,
	[fkRol] [int] NOT NULL,
	[fkEmpresa] [int] NULL,
	[Cuit] [varchar](50) NULL,
	[Telefono] [varchar](50) NULL,
 CONSTRAINT [PK_Dueño] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsuarioXReunion]    Script Date: 14/8/2023 12:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuarioXReunion](
	[IdUsuario] [int] NOT NULL,
	[IdReunion] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ventas]    Script Date: 14/8/2023 12:07:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ventas](
	[IdVenta] [int] IDENTITY(1,1) NOT NULL,
	[fkUsuario] [int] NOT NULL,
	[fkEstado] [int] NOT NULL,
	[fkCliente] [int] NOT NULL,
 CONSTRAINT [PK_Ventas] PRIMARY KEY CLUSTERED 
(
	[IdVenta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Clientes] ON 

INSERT [dbo].[Clientes] ([Id], [Nombre], [Apellido], [Mail], [fkUsuario], [Telefono]) VALUES (1, N'ivo', N'singer', N'ivo@gmail.com', 1, 1122758572)
INSERT [dbo].[Clientes] ([Id], [Nombre], [Apellido], [Mail], [fkUsuario], [Telefono]) VALUES (25, N'Juancho', N'Camiones', N'juancho@234es.com', 0, 1231411)
INSERT [dbo].[Clientes] ([Id], [Nombre], [Apellido], [Mail], [fkUsuario], [Telefono]) VALUES (26, N'Juancho', N'Perez', N'susususisusjdnf@gmail.com', 0, 1231411)
INSERT [dbo].[Clientes] ([Id], [Nombre], [Apellido], [Mail], [fkUsuario], [Telefono]) VALUES (27, N'Malandril', N'Snieg', N'juancho12334@camiones.com', 0, 111233)
SET IDENTITY_INSERT [dbo].[Clientes] OFF
GO
SET IDENTITY_INSERT [dbo].[Empresa] ON 

INSERT [dbo].[Empresa] ([Id], [Codigo], [Cuit], [Nombre]) VALUES (1, 12345, 123, N'Microsoft')
INSERT [dbo].[Empresa] ([Id], [Codigo], [Cuit], [Nombre]) VALUES (2, 123, 2234, N'SmanWatches')
SET IDENTITY_INSERT [dbo].[Empresa] OFF
GO
SET IDENTITY_INSERT [dbo].[Rol] ON 

INSERT [dbo].[Rol] ([Id], [Nombre]) VALUES (1, N'Jefe')
INSERT [dbo].[Rol] ([Id], [Nombre]) VALUES (2, N'Vendedor')
SET IDENTITY_INSERT [dbo].[Rol] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([Id], [Nombre], [Apellido], [Contraseña], [Mail], [CodigoEmpresa], [fkRol], [fkEmpresa], [Cuit], [Telefono]) VALUES (1, N'ari', N'cohen', N'123', N'ari@gmail.com', 12345, 2, 1, N'123', N'1122345476')
INSERT [dbo].[Usuarios] ([Id], [Nombre], [Apellido], [Contraseña], [Mail], [CodigoEmpresa], [fkRol], [fkEmpresa], [Cuit], [Telefono]) VALUES (2, N'martin', N'perez', N'123', N'martin@gmail.com', 123, 1, 1, N'12345', N'1122758573')
INSERT [dbo].[Usuarios] ([Id], [Nombre], [Apellido], [Contraseña], [Mail], [CodigoEmpresa], [fkRol], [fkEmpresa], [Cuit], [Telefono]) VALUES (3, N'fede', N'snieg', N'123', N'flecha@gmail.com', 123, 1, 1, N'12345', N'1125458573')
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
ALTER TABLE [dbo].[Notas]  WITH CHECK ADD  CONSTRAINT [FK_Notas_Reuniones1] FOREIGN KEY([fkReunion])
REFERENCES [dbo].[Reuniones] ([Id])
GO
ALTER TABLE [dbo].[Notas] CHECK CONSTRAINT [FK_Notas_Reuniones1]
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_Empresa] FOREIGN KEY([fkEmpresa])
REFERENCES [dbo].[Empresa] ([Id])
GO
ALTER TABLE [dbo].[Usuarios] CHECK CONSTRAINT [FK_Usuarios_Empresa]
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_Rol] FOREIGN KEY([fkRol])
REFERENCES [dbo].[Rol] ([Id])
GO
ALTER TABLE [dbo].[Usuarios] CHECK CONSTRAINT [FK_Usuarios_Rol]
GO
ALTER TABLE [dbo].[UsuarioXReunion]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioXReunion_Reuniones] FOREIGN KEY([IdReunion])
REFERENCES [dbo].[Reuniones] ([Id])
GO
ALTER TABLE [dbo].[UsuarioXReunion] CHECK CONSTRAINT [FK_UsuarioXReunion_Reuniones]
GO
ALTER TABLE [dbo].[UsuarioXReunion]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioXReunion_Usuarios] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuarios] ([Id])
GO
ALTER TABLE [dbo].[UsuarioXReunion] CHECK CONSTRAINT [FK_UsuarioXReunion_Usuarios]
GO
ALTER TABLE [dbo].[Ventas]  WITH CHECK ADD  CONSTRAINT [FK_Ventas_Clientes] FOREIGN KEY([fkUsuario])
REFERENCES [dbo].[Clientes] ([Id])
GO
ALTER TABLE [dbo].[Ventas] CHECK CONSTRAINT [FK_Ventas_Clientes]
GO
ALTER TABLE [dbo].[Ventas]  WITH CHECK ADD  CONSTRAINT [FK_Ventas_Estado] FOREIGN KEY([fkEstado])
REFERENCES [dbo].[Estado] ([Id])
GO
ALTER TABLE [dbo].[Ventas] CHECK CONSTRAINT [FK_Ventas_Estado]
GO
ALTER TABLE [dbo].[Ventas]  WITH CHECK ADD  CONSTRAINT [FK_Ventas_Usuarios] FOREIGN KEY([fkUsuario])
REFERENCES [dbo].[Usuarios] ([Id])
GO
ALTER TABLE [dbo].[Ventas] CHECK CONSTRAINT [FK_Ventas_Usuarios]
GO
USE [master]
GO
ALTER DATABASE [MarCo] SET  READ_WRITE 
GO
