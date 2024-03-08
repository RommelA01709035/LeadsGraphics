
CREATE TABLE Funcion (
    IDFuncion INT PRIMARY KEY,
    Accion VARCHAR(30)
);

CREATE TABLE Roles (
    IDRol INT PRIMARY KEY,
    Descripcion_Rol VARCHAR(50)
);

CREATE TABLE Posee (
    IDPosee INT PRIMARY KEY,
    IDRol INT,
    IDFuncion INT,
    FOREIGN KEY (IDRol) REFERENCES Roles(IDRol),
    FOREIGN KEY (IDFuncion) REFERENCES Funcion(IDFuncion)
);

CREATE TABLE Usuario (
    IDUsuario INT PRIMARY KEY,
    Nombre VARCHAR(150),
    Celular VARCHAR(20),
    Correo VARCHAR(40),
    Contrasena VARCHAR(600),
    Fecha_Ingreso DATE,
    Habilitado BOOLEAN
);

CREATE TABLE Tiene (
    IDTiene INT PRIMARY KEY,
    IDUsuario INT,
    IDRol INT,
    Fecha_Asignacion DATE,
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario),
    FOREIGN KEY (IDRol) REFERENCES Roles(IDRol)
);

CREATE TABLE Workspace (
    IDWorkspace INT PRIMARY KEY,
    Cantidad_Usuarios INT,
    Numero_Versiones INT
);

CREATE TABLE Crea (
    IDCreacion INT PRIMARY KEY,
    IDWorkspace INT,
    IDUsuario INT,
    Fecha_Creacion DATE,
    FOREIGN KEY (IDWorkspace) REFERENCES Workspace(IDWorkspace),
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario)
);

CREATE TABLE Historial (
    IDHistorial INT PRIMARY KEY,
    Fecha_Creacion_Historial DATE,
    Fecha_Modificacion_Historial DATE,
    Version INT
);


CREATE TABLE Leads (
    IDLead INT PRIMARY KEY,
    IDHistorial INT,
    IDWorkspace INT,
    Telefono VARCHAR(20),
    Nombre VARCHAR(100),
    Valor FLOAT,
    Ganado BOOLEAN,
    Correo VARCHAR(40),
    Etiqueta VARCHAR(40),
    Compania VARCHAR(100),
    Creado DATE,
    Hora_Creacion TIME,
    Fecha_Primer_Mensaje DATE,
    Hora_Primer_Mensaje TIME,
    Primer_Mensaje TEXT,
    Fecha_Ultimo_Mensaje DATE,
    Hora_Ultimo_Mensaje TIME,
    Ultimo_Mensaje TEXT,
    Estado_Lead VARCHAR(40),
    Seller_Asignado VARCHAR(100),
    Embudo VARCHAR(50),
    Etapa VARCHAR(50),
    Archivado VARCHAR(10),
    Creado_Manualmente BOOLEAN,
    FOREIGN KEY (IDHistorial) REFERENCES Historial(IDHistorial),
    FOREIGN KEY (IDWorkspace) REFERENCES Workspace(IDWorkspace)
);

CREATE TABLE Contenedor (
    IDContenedor INT PRIMARY KEY,
    Fecha_Creacion_Contenedor DATE,
    Autor VARCHAR(100)
);

CREATE TABLE Reporte (
    IDReporte INT PRIMARY KEY,
    IDContenedor INT,
    Fecha_Creacion_Informe DATE,
    Autor VARCHAR(100),
    Descripcion TEXT,
    FOREIGN KEY (IDContenedor) REFERENCES Contenedor(IDContenedor)
);

CREATE TABLE Pertenece (
    IDGenerado INT PRIMARY KEY,
    IDContenedor INT,
    IDLead INT,
    Fecha_Generacion DATE,
    FOREIGN KEY (IDContenedor) REFERENCES Contenedor(IDContenedor),
    FOREIGN KEY (IDLead) REFERENCES Leads(IDLead)
);
