INSERT INTO Funcion (IDFuncion, Accion)
VALUES (1, 'Consultar grafica');

INSERT INTO Contenedor (IDContenedor, Fecha_Creacion_Contenedor, Autor)
VALUES (1, '2024-03-06', 'Juan');

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (1, '2024-03-06', '2024-03-06', 1);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (1, 2);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (1, 'Juan', '123-456-7890', 'Juane@gmail.com', 'securepassword', '2024-03-06', true);

INSERT INTO Roles (IDRol, Descripcion_Rol)
VALUES (1, 'Owner');

INSERT INTO Tiene (IDTiene, IDUsuario, IDRol, Fecha_Asignacion)
VALUES (1, 1, 1, '2024-03-06');

INSERT INTO Posee (IDPosee, IDRol, IDFuncion)
VALUES (1, 1, 1);

INSERT INTO Reporte (IDReporte, IDContenedor, Fecha_Creacion_Informe, Autor, Descripcion)
VALUES (1, 1, '2024-03-06', 'Juan', 'Informe del día 2024-03-06');

INSERT INTO Leads (IDLead, IDHistorial, IDWorkspace, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente)
VALUES (1, 1, 1, '555-1234', 'Pedro', 1000.00, true, 'Pedro@gmail.com', 'Importante', 'ABC', '2024-03-06', '12:00:00', '2024-03-06', '12:30:00', 'Buenos días ', '2024-06-03', '13:00:00', 'Gracias hasta luego', 'Ended', 'John', 'Presales', 'Contactados', 'true', false);

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (1, 1, 1, '2024-03-06');

INSERT INTO Pertenece (IDGenerado, IDContenedor, IDLead, Fecha_Generacion)
VALUES (1, 1, 1, '2024-03-06');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (2, 'Consultar reportes');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (3, 'Autenticarse');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (4, 'Descargar reporte');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (5, 'Cargar CSV');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (6, 'Registrar usuario');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (7, 'Eliminar usuarios');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (8, 'Asigna seller');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (9, 'Asigna roles');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (10, 'Consultar historial');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (11, 'Editar usuario');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (12, 'Consultar usuario');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (13, 'Cambiar contraseña');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (14, 'Modificar Lead');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (15, 'Recuperar contraseña');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (16, 'Eliminar Lead');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (17, 'Crear Lead');

INSERT INTO Funcion (IDFuncion, Accion)
VALUES (18, 'Consultar Lead');



INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (2, 'Alejandra', '555-111-2222', 'alejandra@gmail.com', 'password123', '2024-03-07', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (3, 'Miguel', '555-333-4444', 'miguel@gmail.com', 'miguelito123', '2024-03-08', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (4, 'Karla', '555-555-6666', 'karla@gmail.com', 'karlita456', '2024-03-09', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (5, 'Ricardo', '555-777-8888', 'ricardo@gmail.com', 'ricardito789', '2024-03-10', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (6, 'Gabriela', '555-999-0000', 'gabriela@gmail.com', 'gaby567', '2024-03-11', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (7, 'Javier', '555-222-3333', 'javier@gmail.com', 'javi890', '2024-03-12', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (8, 'María', '555-444-5555', 'maria@gmail.com', 'marita123', '2024-03-13', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (9, 'Carlos', '555-666-7777', 'carlos@gmail.com', 'carlitos456', '2024-03-14', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (10, 'Laura', '555-888-9999', 'laura@gmail.com', 'laurita789', '2024-03-15', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (11, 'Eduardo', '555-000-1111', 'eduardo@gmail.com', 'edu567', '2024-03-16', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (12, 'Ana', '555-222-3333', 'ana@gmail.com', 'ana890', '2024-03-17', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (13, 'José', '555-444-5555', 'jose@gmail.com', 'jose123', '2024-03-18', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (14, 'Verónica', '555-666-7777', 'veronica@gmail.com', 'vero456', '2024-03-19', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (15, 'Francisco', '555-888-9999', 'francisco@gmail.com', 'fran789', '2024-03-20', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (16, 'Silvia', '555-111-2222', 'silvia@gmail.com', 'silvi123', '2024-03-21', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (17, 'Raul', '555-333-4444', 'raul@gmail.com', 'raulito456', '2024-03-22', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (18, 'Patricia', '555-555-6666', 'patricia@gmail.com', 'patty789', '2024-03-23', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (19, 'Héctor', '555-777-8888', 'hector@gmail.com', 'hect123', '2024-03-24', true);

INSERT INTO Usuario(IDUsuario, Nombre, Celular, Correo, Contrasena, Fecha_Ingreso, Habilitado)
VALUES (20, 'Carmen', '555-999-0000', 'carmen@gmail.com', 'carmencita456', '2024-03-25', true);



INSERT INTO Tiene (IDTiene, IDUsuario, IDRol, Fecha_Asignacion)
VALUES 
  (2, 2, 2, '2024-03-07'),
  (3, 3, 3, '2024-03-08'),
  (4, 4, 4, '2024-03-09'),
  (5, 5, 5, '2024-03-10'),
  (6, 6, 6, '2024-03-11'),
  (7, 7, 7, '2024-03-12'),
  (8, 8, 8, '2024-03-13'),
  (9, 9, 9, '2024-03-14'),
  (10, 10, 10, '2024-03-15'),
  (11, 11, 11, '2024-03-16'),
  (12, 12, 12, '2024-03-17'),
  (13, 13, 13, '2024-03-18'),
  (14, 14, 14, '2024-03-19'),
  (15, 15, 15, '2024-03-20'),
  (16, 16, 16, '2024-03-21'),
  (17, 17, 17, '2024-03-22'),
  (18, 18, 18, '2024-03-23'),
  (19, 19, 19, '2024-03-24'),
  (20, 20, 20, '2024-03-25');
  
  
INSERT INTO Posee (IDPosee, IDRol, IDFuncion)
VALUES
  (2, 1, 2), 
  (3, 1, 3), 
  (4, 1, 4), 
  (5, 1, 5), 
  (6, 1, 6), 
  (7, 1, 7), 
  (8, 1, 8), 
  (9, 1, 9), 
  (10, 1, 10), 
  (11, 2, 11), 
  (12, 2, 12), 
  (13, 2, 13), 
  (14, 2, 14), 
  (15, 3, 15), 
  (16, 3, 16), 
  (17, 3, 17), 
  (18, 3, 18); 
  


INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (2, 3);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (3, 1);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (4, 5);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (5, 2);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (6, 4);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (7, 1);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (8, 3);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (9, 2);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (10, 6);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (11, 1);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (12, 4);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (13, 2);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (14, 3);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (15, 1);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (16, 4);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (17, 2);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (18, 5);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (19, 3);

INSERT INTO Workspace (IDWorkspace, Numero_Versiones)
VALUES (20, 2);

INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (2, 'Owner');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (3, 'Owner');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (4, 'Owner');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (5, 'Owner');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (6, 'Owner');

INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (7, 'Admin');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (8, 'Admin');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (9, 'Admin');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (10, 'Admin');

INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (11, 'Seller');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (12, 'Seller');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (13, 'Seller');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (14, 'Seller');

INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (15, 'Owner');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (16, 'Admin');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (17, 'Seller');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (18, 'Owner');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (19, 'Admin');
INSERT INTO Roles (IDRol, Descripcion_Rol) VALUES (20, 'Seller');

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (2, '2024-03-07', '2024-03-07', 2);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (3, '2024-03-08', '2024-03-08', 3);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (4, '2024-03-09', '2024-03-09', 4);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (5, '2024-03-10', '2024-03-10', 5);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (6, '2024-03-11', '2024-03-11', 6);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (7, '2024-03-12', '2024-03-12', 7);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (8, '2024-03-13', '2024-03-13', 8);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (9, '2024-03-14', '2024-03-14', 9);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (10, '2024-03-15', '2024-03-15', 10);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (11, '2024-03-16', '2024-03-16', 11);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (12, '2024-03-17', '2024-03-17', 12);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (13, '2024-03-18', '2024-03-18', 13);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (14, '2024-03-19', '2024-03-19', 14);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (15, '2024-03-20', '2024-03-20', 15);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (16, '2024-03-21', '2024-03-21', 16);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (17, '2024-03-22', '2024-03-22', 17);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (18, '2024-03-23', '2024-03-23', 18);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (19, '2024-03-24', '2024-03-24', 19);

INSERT INTO Historial (IDHistorial, Fecha_Creacion_Historial, Fecha_Modificacion_Historial, Version)
VALUES (20, '2024-03-25', '2024-03-25', 20);

-- Registros para Crea
INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (2, 2, 2, '2024-03-07');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (3, 3, 3, '2024-03-08');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (4, 4, 4, '2024-03-09');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (5, 5, 5, '2024-03-10');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (6, 6, 6, '2024-03-11');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (7, 7, 7, '2024-03-12');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (8, 8, 8, '2024-03-13');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (9, 9, 9, '2024-03-14');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (10, 10, 10, '2024-03-15');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (11, 11, 11, '2024-03-16');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (12, 12, 12, '2024-03-17');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (13, 13, 13, '2024-03-18');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (14, 14, 14, '2024-03-19');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (15, 15, 15, '2024-03-20');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (16, 16, 16, '2024-03-21');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (17, 17, 17, '2024-03-22');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (18, 18, 18, '2024-03-23');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (19, 19, 19, '2024-03-24');

INSERT INTO Crea (IDCreacion, IDWorkspace, IDUsuario, Fecha_Creacion)
VALUES (20, 20, 20, '2024-03-25');

SELECT * FROM leadgraphs.contenedor;INSERT INTO `leadgraphs`.`contenedor`
(`IDContenedor`,
`Fecha_Creacion_Contenedor`,
`Autor`)
VALUES
(1,2024-03-06,Juan),
(2,2024-03-08,Ana),
(3,2024-03-09,Miguel),
(4,2024-03-10,Laura),
(5,2024-03-11,Sofia),
(6,2024-03-12,Diego),
(7,2024-03-13,Valeria),
(8,2024-03-14,Eduardo),
(1,2024-03-06,Isabella);

INSERT INTO `leadgraphs`.`tiene`
(`IDTiene`,
`IDUsuario`,
`IDRol`,
`Fecha_Asignacion`)
VALUES
(2,2,2,2024-03-07),
(3,3,3,2024-03-08),
(4,4,4,2024-03-09),
(5,5,5,2024-03-10),
(6,6,6,2024-03-11),
(7,7,7,2024-03-12),
(8,8,8,2024-03-13),
(9,9,9,2024-03-14),
(10,10,10,2024-03-15),
(11,11,11,2024-03-16),
(12,12,12,2024-03-17),
(13,13,13,2024-03-18),
(14,14,14,2024-03-19),
(15,15,15,2024-03-20),
(16,16,16,2024-03-21),
(17,17,17,2024-03-22),
(18,18,18,2024-03-23),
(19,19,19,2024-03-24),
(20,20,20,2024-03-25);
SELECT * FROM leadgraphs.tiene;
