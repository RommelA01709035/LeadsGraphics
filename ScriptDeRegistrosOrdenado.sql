Create database leadgraphs;
USE leadgraphs;

CREATE TABLE Usuario (
    IDUsuario INT NOT NULL PRIMARY KEY,
    Nombre VARCHAR(150),
    Celular VARCHAR(20),
    Correo VARCHAR(40),
    Contrasena VARCHAR(600),
    Fecha_Ingreso DATE,
    Habilitado BOOLEAN
);
INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (1, 'Juan', '123-456-7890', 'Juane@gmail.com', 'securepassword', '2024-03-06', true),
(2, 'Alejandra', '555-111-2222', 'alejandra@gmail.com', 'password123', '2024-03-07', true),
(3, 'Miguel', '555-333-4444', 'miguel@gmail.com', 'miguelito123', '2024-03-08', true),
(4, 'Karla', '555-555-6666', 'karla@gmail.com', 'karlita456', '2024-03-09', true),
(5, 'Ricardo', '555-777-8888', 'ricardo@gmail.com', 'ricardito789', '2024-03-10', true),
(6, 'Gabriela', '555-999-0000', 'gabriela@gmail.com', 'gaby567', '2024-03-11', true),
(7, 'Javier', '555-222-3333', 'javier@gmail.com', 'javi890', '2024-03-12', true),
(8, 'María', '555-444-5555', 'maria@gmail.com', 'marita123', '2024-03-13', true),
(9, 'Carlos', '555-666-7777', 'carlos@gmail.com', 'carlitos456', '2024-03-14', true),
(10, 'Laura', '555-888-9999', 'laura@gmail.com', 'laurita789', '2024-03-15', true),
(11, 'Eduardo', '555-000-1111', 'eduardo@gmail.com', 'edu567', '2024-03-16', true),
(12, 'Ana', '555-222-3333', 'ana@gmail.com', 'ana890', '2024-03-17', true),
(13, 'José', '555-444-5555', 'jose@gmail.com', 'jose123', '2024-03-18', true),
(14, 'Verónica', '555-666-7777', 'veronica@gmail.com', 'vero456', '2024-03-19', true),
(15, 'Francisco', '555-888-9999', 'francisco@gmail.com', 'fran789', '2024-03-20', true),
(16, 'Silvia', '555-111-2222', 'silvia@gmail.com', 'silvi123', '2024-03-21', true),
(17, 'Raul', '555-333-4444', 'raul@gmail.com', 'raulito456', '2024-03-22', true),
(18, 'Patricia', '555-555-6666', 'patricia@gmail.com', 'patty789', '2024-03-23', true),
(19, 'Héctor', '555-777-8888', 'hector@gmail.com', 'hect123', '2024-03-24', true),
(20, 'Carmen', '555-999-0000', 'carmen@gmail.com', 'carmencita456', '2024-03-25', true);


CREATE TABLE Funcion (
    IDFuncion INT NOT NULL PRIMARY KEY,
    Accion VARCHAR(30)
);
INSERT INTO Funcion (IDFuncion, Accion)
VALUES (1, 'Consultar grafica'),
(2, 'Consultar reportes'),
(3, 'Autenticarse'),
(4, 'Descargar reporte'),
(5, 'Cargar CSV'),
(6, 'Registrar usuario'),
(7, 'Eliminar usuarios'),
(8, 'Asigna seller'),
(9, 'Asigna roles'),
(10, 'Consultar historial'),
(11, 'Editar usuario'),
(12, 'Consultar usuario'),
(13, 'Cambiar contraseña'),
(14, 'Modificar Lead'),
(15, 'Recuperar contraseña'),
(16, 'Eliminar Lead'),
(17, 'Crear Lead'),
(18, 'Consultar Lead');


CREATE TABLE Roles (
    IDRol INT NOT NULL PRIMARY KEY,
    Descripcion_Rol VARCHAR(50)
);
INSERT INTO Roles (IDRol, Descripcion_Rol)
VALUES (1, 'Owner'),
	(2, 'Admin'),
	(3, 'Seller');


CREATE TABLE Historial (
    IDHistorial INT NOT NULL PRIMARY KEY,
    Fecha_Creacion_Historial DATE,
    Fecha_Modificacion_Historial DATE,
    Version INT
);
INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (1, '2024-03-06', '2024-03-06', 1);


CREATE TABLE Contenedor (
    IDContenedor INT NOT NULL PRIMARY KEY,
    Fecha_Creacion_Contenedor DATE,
    Autor VARCHAR(100)
);
INSERT INTO Contenedor (IDContenedor, Fecha_Creacion_Contenedor, Autor)
VALUES (1, '2024-03-06', 'Juan');


CREATE TABLE Workspace (
    IDWorkspace INT NOT NULL PRIMARY KEY,
    Cantidad_Usuarios INT,
    Numero_Versiones INT
);
INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (1, 2),
(2, 3),
(3, 1),
(4, 5),
(5, 2),
(6, 4),
(7, 1),
(8, 3),
(9, 2),
(10, 6),
(11, 1),
(12, 4),
(13, 2),
(14, 3),
(15, 1),
(16, 4),
(17, 2),
(18, 5),
(19, 3),
(20, 2);


CREATE TABLE Posee (
    IDPosee INT NOT NULL PRIMARY KEY,
    IDRol INT,
    IDFuncion INT,
    FOREIGN KEY (IDRol) REFERENCES Roles(IDRol),
    FOREIGN KEY (IDFuncion) REFERENCES Funcion(IDFuncion)
);
INSERT INTO Posee (IDPosee, IDRol, IDFuncion)
VALUES (1, 1, 1);


CREATE TABLE Tiene (
    IDTiene INT NOT NULL PRIMARY KEY,
    IDUsuario INT,
    IDRol INT,
    Fecha_Asignacion DATE,
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario),
    FOREIGN KEY (IDRol) REFERENCES Roles(IDRol)
);
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (1, '2024-03-06');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (2, '2024-03-07');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (3, '2024-03-08');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (4, '2024-03-09');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (5, '2024-03-10');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (6, '2024-03-11');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (7, '2024-03-12');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (8, '2024-03-13');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (9, '2024-03-14');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (10, '2024-03-15');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (11, '2024-03-16');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (12, '2024-03-17');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (13, '2024-03-18');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (14, '2024-03-19');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (15, '2024-03-20');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (16, '2024-03-21');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (17, '2024-03-22');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (18, '2024-03-23');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (19, '2024-03-24');
INSERT INTO Tiene (IDTiene, Fecha_Asignacion)
VALUES 
  (20, '2024-03-25');


CREATE TABLE Crea (
    IDCreacion INT NOT NULL PRIMARY KEY,
    IDWorkspace INT,
    IDUsuario INT,
    Fecha_Creacion DATE,
    FOREIGN KEY (IDWorkspace) REFERENCES Workspace(IDWorkspace),
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario)
);
INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (1, 1, 1, '2024-03-06');



CREATE TABLE Leads (
    IDLead INT NOT NULL PRIMARY KEY,
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
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (1, '555-1234', 'Pedro', 1000.00, true, 'Pedro@gmail.com', 'Importante', 'ABC', '2024-03-06', '12:00:00', '2024-03-06', '12:30:00', 'Buenos días ', '2024-06-03', '13:00:00', 'Gracias hasta luego', 'Ended', 'John', 'Presales', 'Contactados', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (2, '555-5678', 'María', 1500.00, false, 'maria@gmail.com', 'Normal', 'XYZ', '2024-03-07', '11:30:00', '2024-03-07', '12:00:00', 'Hola, ¿cómo estás?', '2024-06-04', '14:00:00', 'Nos vemos pronto', 'In progress', 'Sarah', 'Sales', 'Qualified', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (3, '555-9012', 'Juan', 2000.00, true, 'juan@gmail.com', 'Urgente', 'DEF', '2024-03-08', '10:00:00', '2024-03-08', '10:30:00', 'Good morning', '2024-06-05', '15:00:00', 'See you later', 'New', 'Emily', 'Marketing', 'Cold', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (4, '555-3456', 'Ana', 1200.00, true, 'ana@gmail.com', 'Importante', 'GHI', '2024-03-09', '09:30:00', '2024-03-09', '10:00:00', 'Hi there', '2024-06-06', '16:00:00', 'Take care', 'Qualified', 'Michael', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (5, '555-6789', 'Luis', 1800.00, false, 'luis@gmail.com', 'Normal', 'JKL', '2024-03-10', '08:45:00', '2024-03-10', '09:15:00', 'Hello!', '2024-06-07', '17:00:00', 'Have a great day', 'Cold', 'Sophia', 'Marketing', 'Contacted', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (6, '555-4321', 'Laura', 1600.00, true, 'laura@gmail.com', 'Urgente', 'MNO', '2024-03-11', '14:00:00', '2024-03-11', '14:30:00', 'Hey!', '2024-06-08', '18:00:00', 'See you tomorrow', 'Qualified', 'David', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (7, '555-7890', 'Carlos', 1400.00, false, 'carlos@gmail.com', 'Normal', 'PQR', '2024-03-12', '13:30:00', '2024-03-12', '14:00:00', 'Hi!', '2024-06-09', '09:00:00', 'Goodbye', 'Cold', 'Emma', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (8, '555-8901', 'Marta', 1700.00, true, 'marta@gmail.com', 'Importante', 'STU', '2024-03-13', '10:45:00', '2024-03-13', '11:15:00', 'Good morning', '2024-06-10', '10:30:00', 'See you later', 'New', 'Daniel', 'Presales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (9, '555-6789', 'Elena', 1900.00, false, 'elena@gmail.com', 'Normal', 'VWX', '2024-03-14', '09:15:00', '2024-03-14', '09:45:00', 'Hello!', '2024-06-11', '11:00:00', 'Have a great day', 'Cold', 'Sophia', 'Marketing', 'Contacted', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (10, '555-1234', 'Diego', 1300.00, true, 'diego@gmail.com', 'Urgente', 'YZA', '2024-03-15', '12:30:00', '2024-03-15', '13:00:00', 'Hey there!', '2024-06-12', '12:30:00', 'Talk to you later', 'Qualified', 'Sarah', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (11, '555-2345', 'Sara', 1400.00, false, 'sara@gmail.com', 'Normal', 'ZAB', '2024-03-16', '11:45:00', '2024-03-16', '12:15:00', 'Hello!', '2024-06-13', '13:00:00', 'Take care', 'Cold', 'John', 'Marketing', 'Contacted', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (12, '555-3456', 'Mario', 1500.00, true, 'mario@gmail.com', 'Importante', 'BCD', '2024-03-17', '10:15:00', '2024-03-17', '10:45:00', 'Good morning', '2024-06-14', '14:00:00', 'See you later', 'Qualified', 'Emily', 'Presales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (13, '555-4567', 'Lorena', 1600.00, false, 'lorena@gmail.com', 'Normal', 'CDE', '2024-03-18', '09:30:00', '2024-03-18', '10:00:00', 'Hi there', '2024-06-15', '15:30:00', 'Goodbye', 'Cold', 'Michael', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (14, '555-5678', 'Camila', 1700.00, true, 'camila@gmail.com', 'Urgente', 'EFG', '2024-03-19', '11:00:00', '2024-03-19', '11:30:00', 'Hello!', '2024-06-16', '16:00:00', 'See you tomorrow', 'New', 'Sophia', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (15, '555-6789', 'Javier', 1800.00, false, 'javier@gmail.com', 'Normal', 'GHI', '2024-03-20', '10:30:00', '2024-03-20', '11:00:00', 'Hey there!', '2024-06-17', '17:30:00', 'Talk to you later', 'Cold', 'Daniel', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (16, '555-7890', 'Lucía', 1900.00, true, 'lucia@gmail.com', 'Importante', 'HIJ', '2024-03-21', '09:45:00', '2024-03-21', '10:15:00', 'Good morning', '2024-06-18', '12:00:00', 'See you later', 'Qualified', 'Emma', 'Presales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (17, '555-8901', 'Marcos', 2000.00, false, 'marcos@gmail.com', 'Normal', 'IJK', '2024-03-22', '11:00:00', '2024-03-22', '11:30:00', 'Hi!', '2024-06-19', '14:30:00', 'Goodbye', 'Cold', 'Sarah', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (18, '555-9012', 'Ana María', 2200.00, true, 'anamaria@gmail.com', 'Urgente', 'JKL', '2024-03-23', '10:15:00', '2024-03-23', '10:45:00', 'Hello!', '2024-06-20', '13:00:00', 'Take care', 'New', 'John', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (19, '555-2345', 'Gabriel', 1800.00, false, 'gabriel@gmail.com', 'Normal', 'KLM', '2024-03-24', '12:00:00', '2024-03-24', '12:30:00', 'Hey there!', '2024-06-21', '15:30:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (20, '555-3456', 'Carolina', 1900.00, true, 'carolina@gmail.com', 'Importante', 'MNO', '2024-03-25', '11:30:00', '2024-03-25', '12:00:00', 'Good morning', '2024-06-22', '16:00:00', 'See you later', 'Qualified', 'David', 'Presales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (21, '555-4567', 'Daniel', 2000.00, false, 'daniel@gmail.com', 'Normal', 'NOP', '2024-03-26', '09:00:00', '2024-03-26', '09:30:00', 'Hi there', '2024-06-23', '10:30:00', 'Goodbye', 'Cold', 'Emily', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (22, '555-5678', 'Alejandro', 2100.00, true, 'alejandro@gmail.com', 'Urgente', 'PQR', '2024-03-27', '10:45:00', '2024-03-27', '11:15:00', 'Hello!', '2024-06-24', '12:00:00', 'See you tomorrow', 'New', 'Michael', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (23, '555-6789', 'Valeria', 2200.00, false, 'valeria@gmail.com', 'Normal', 'QRS', '2024-03-28', '12:30:00', '2024-03-28', '13:00:00', 'Hey there!', '2024-06-25', '14:30:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (24, '555-7890', 'Lucas', 2300.00, true, 'lucas@gmail.com', 'Importante', 'RST', '2024-03-29', '13:15:00', '2024-03-29', '13:45:00', 'Good morning', '2024-06-26', '15:00:00', 'See you later', 'Qualified', 'Emma', 'Presales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (25, '555-9012', 'Paula', 2400.00, false, 'paula@gmail.com', 'Normal', 'STU', '2024-03-30', '14:00:00', '2024-03-30', '14:30:00', 'Hi!', '2024-06-27', '16:30:00', 'Goodbye', 'Cold', 'John', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (26, '555-1234', 'Julia', 2500.00, true, 'julia@gmail.com', 'Urgente', 'TUV', '2024-03-31', '15:30:00', '2024-03-31', '16:00:00', 'Hello!', '2024-06-28', '09:00:00', 'Take care', 'New', 'Michael', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (27, '555-2345', 'Mateo', 2600.00, false, 'mateo@gmail.com', 'Normal', 'UVW', '2024-04-01', '16:45:00', '2024-04-01', '17:15:00', 'Hey there!', '2024-06-29', '10:30:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (28, '555-3456', 'Isabella', 2700.00, true, 'isabella@gmail.com', 'Importante', 'VWX', '2024-04-02', '17:00:00', '2024-04-02', '17:30:00', 'Good morning', '2024-06-30', '11:45:00', 'See you later', 'Qualified', 'Emma', 'Presales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (29, '555-4567', 'David', 2800.00, false, 'david@gmail.com', 'Normal', 'WXY', '2024-04-03', '09:30:00', '2024-04-03', '10:00:00', 'Hi there', '2024-07-01', '13:00:00', 'Goodbye', 'Cold', 'John', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (30, '555-5678', 'Valentina', 2900.00, true, 'valentina@gmail.com', 'Urgente', 'XYZ', '2024-04-04', '10:45:00', '2024-04-04', '11:15:00', 'Hello!', '2024-07-02', '14:30:00', 'See you tomorrow', 'New', 'Michael', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (31, '555-6789', 'Martín', 3000.00, false, 'martin@gmail.com', 'Normal', 'YZA', '2024-04-05', '11:30:00', '2024-04-05', '12:00:00', 'Hi!', '2024-07-03', '15:00:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (32, '555-7890', 'Carla', 3100.00, true, 'carla@gmail.com', 'Importante', 'ZAB', '2024-04-06', '12:15:00', '2024-04-06', '12:45:00', 'Good morning', '2024-07-04', '09:30:00', 'See you later', 'Qualified', 'Emma', 'Presales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (33, '555-9012', 'Julián', 3200.00, false, 'julian@gmail.com', 'Normal', 'ABC', '2024-04-07', '13:00:00', '2024-04-07', '13:30:00', 'Hello!', '2024-07-05', '10:45:00', 'Goodbye', 'Cold', 'John', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (34, '555-2345', 'Fernanda', 3300.00, true, 'fernanda@gmail.com', 'Urgente', 'BCD', '2024-04-08', '14:30:00', '2024-04-08', '15:00:00', 'Hey there!', '2024-07-06', '11:00:00', 'Take care', 'New', 'Michael', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (35, '555-3456', 'Juan', 3400.00, false, 'juan@gmail.com', 'Normal', 'CDE', '2024-04-09', '15:45:00', '2024-04-09', '16:15:00', 'Hi there', '2024-07-07', '12:15:00', 'Goodbye', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (36, '555-4567', 'María', 3500.00, true, 'maria@gmail.com', 'Importante', 'DEF', '2024-04-10', '16:30:00', '2024-04-10', '17:00:00', 'Hello!', '2024-07-08', '13:30:00', 'See you tomorrow', 'New', 'Michael', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (37, '555-5678', 'Diego', 3600.00, false, 'diego@gmail.com', 'Normal', 'EFG', '2024-04-11', '17:45:00', '2024-04-11', '18:15:00', 'Hi!', '2024-07-09', '14:45:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (38, '555-6789', 'Sofía', 3700.00, true, 'sofia@gmail.com', 'Urgente', 'FGH', '2024-04-12', '09:00:00', '2024-04-12', '09:30:00', 'Hey there!', '2024-07-10', '15:00:00', 'Take care', 'New', 'Michael', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (39, '555-7890', 'Lucas', 3800.00, false, 'lucas@gmail.com', 'Normal', 'GHI', '2024-04-13', '09:30:00', '2024-04-13', '10:00:00', 'Hello!', '2024-07-11', '16:15:00', 'Goodbye', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (40, '555-9012', 'Valentina', 3900.00, true, 'valentina@gmail.com', 'Importante', 'HIJ', '2024-04-14', '10:00:00', '2024-04-14', '10:30:00', 'Good morning', '2024-07-12', '09:45:00', 'See you later', 'Qualified', 'Emma', 'Presales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (41, '555-2345', 'Juan Pablo', 4000.00, false, 'juanpablo@gmail.com', 'Normal', 'IJK', '2024-04-15', '11:15:00', '2024-04-15', '11:45:00', 'Hi!', '2024-07-13', '10:00:00', 'Goodbye', 'Cold', 'John', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (42, '555-3456', 'Isabel', 4100.00, true, 'isabel@gmail.com', 'Urgente', 'JKL', '2024-04-16', '12:00:00', '2024-04-16', '12:30:00', 'Hello!', '2024-07-14', '11:15:00', 'Take care', 'New', 'Michael', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (43, '555-4567', 'Martina', 4200.00, false, 'martina@gmail.com', 'Normal', 'KLM', '2024-04-17', '12:45:00', '2024-04-17', '13:15:00', 'Hi there', '2024-07-15', '12:30:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (44, '555-5678', 'Gabriel', 4300.00, true, 'gabriel@gmail.com', 'Importante', 'LMN', '2024-04-18', '13:30:00', '2024-04-18', '14:00:00', 'Good morning', '2024-07-16', '13:45:00', 'See you later', 'Qualified', 'Emma', 'Presales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (45, '555-6789', 'Camila', 4400.00, false, 'camila@gmail.com', 'Normal', 'MNO', '2024-04-19', '14:15:00', '2024-04-19', '14:45:00', 'Hello!', '2024-07-17', '14:00:00', 'Goodbye', 'Cold', 'John', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (46, '555-7890', 'Tomás', 4500.00, true, 'tomas@gmail.com', 'Urgente', 'NOP', '2024-04-20', '15:00:00', '2024-04-20', '15:30:00', 'Hey there!', '2024-07-18', '15:15:00', 'Take care', 'New', 'Michael', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (47, '555-9012', 'Isabella', 4600.00, false, 'isabella@gmail.com', 'Normal', 'OPQ', '2024-04-21', '15:30:00', '2024-04-21', '16:00:00', 'Hi!', '2024-07-19', '16:30:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (48, '555-1234', 'Matías', 4700.00, true, 'matias@gmail.com', 'Importante', 'PQR', '2024-04-22', '16:00:00', '2024-04-22', '16:30:00', 'Hello!', '2024-07-20', '17:00:00', 'See you tomorrow', 'New', 'Michael', 'Sales', 'Contacted', 'false', true);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (49, '555-2345', 'Valeria', 4800.00, false, 'valeria@gmail.com', 'Normal', 'QRS', '2024-04-23', '16:30:00', '2024-04-23', '17:00:00', 'Hi there', '2024-07-21', '17:30:00', 'Goodbye', 'Cold', 'John', 'Marketing', 'Qualified', 'true', false);
INSERT INTO Leads (IDLead, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (50, '555-3456', 'Emilio', 4900.00, true, 'emilio@gmail.com', 'Urgente', 'RST', '2024-04-24', '17:00:00', '2024-04-24', '17:30:00', 'Hey there!', '2024-07-22', '18:00:00', 'Take care', 'New', 'Michael', 'Sales', 'Contacted', 'false', true);


CREATE TABLE Reporte (
    IDReporte INT NOT NULL PRIMARY KEY,
    IDContenedor INT,
    Fecha_Creacion_Informe DATE,
    Autor VARCHAR(100),
    Descripcion TEXT,
    FOREIGN KEY (IDContenedor) REFERENCES Contenedor(IDContenedor)
);
INSERT INTO Reporte (IDReporte, Fecha_Creacion_Informe, Autor, Descripcion)
VALUES (1, '2024-03-06', 'Juan', 'Informe del día 2024-03-06'),
  (2, '2024-03-07', 'Carlos', 'Informe del día 2024-03-07'),
  (3, '2024-03-08', 'Ana', 'Informe del día 2024-03-08'),
  (4, '2024-03-09', 'David', 'Informe del día 2024-03-09'),
  (5, '2024-03-10', 'Elena', 'Informe del día 2024-03-10'),
  (6, '2024-03-11', 'Fernando', 'Informe del día 2024-03-11'),
  (7, '2024-03-12', 'Gabriela', 'Informe del día 2024-03-12'),
  (8, '2024-03-13', 'Hugo', 'Informe del día 2024-03-13'),
  (9, '2024-03-14', 'Isabel', 'Informe del día 2024-03-14'),
  (10, '2024-03-15', 'Juan', 'Informe del día 2024-03-15'),
  (11, '2024-03-16', 'Carlos', 'Informe del día 2024-03-16');


CREATE TABLE Pertenece (
    IDGenerado INT NOT NULL PRIMARY KEY,
    IDContenedor INT,
    IDLead INT,
    Fecha_Generacion DATE,
    FOREIGN KEY (IDContenedor) REFERENCES Contenedor(IDContenedor),
    FOREIGN KEY (IDLead) REFERENCES Leads(IDLead)
);
INSERT INTO Pertenece (IDGenerado, Fecha_Generacion)
VALUES (1, '2024-03-06'),
(2, '2024-03-08'),
(3, '2023-11-15'),
(4, '2022-07-25'),
(5, '2021-04-10'),
(6, '2020-09-03'),
(7, '2019-12-28'),
(8, '2018-06-20'),
(9, '2017-01-14'),
(10, '2016-08-07'),
(11, '2015-02-19'),
(12, '2014-10-22'),
(13, '2013-05-30'),
(14, '2012-11-01'),
(15, '2011-07-11'),
(16, '2010-03-24'),
(17, '2009-09-11'),
(18, '2008-04-05'),
(19, '2007-12-17'),
(20, '2006-06-26');
