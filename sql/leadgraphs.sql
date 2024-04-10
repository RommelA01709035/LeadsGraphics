-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.11.7-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para leadgraphs
CREATE DATABASE IF NOT EXISTS `leadgraphs` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `leadgraphs`;

-- Volcando estructura para tabla leadgraphs.contenedor
CREATE TABLE IF NOT EXISTS `contenedor` (
  `IDContenedor` int(11) NOT NULL,
  `Fecha_Creacion_Contenedor` date DEFAULT NULL,
  `Autor` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IDContenedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla leadgraphs.contenedor: ~6 rows (aproximadamente)
INSERT INTO `contenedor` (`IDContenedor`, `Fecha_Creacion_Contenedor`, `Autor`) VALUES
	(1, '2024-03-06', 'Juan'),
	(2, '2024-03-20', 'Alejandra'),
	(3, '2024-03-21', 'Miguel'),
	(4, '2024-03-22', 'Karla'),
	(5, '2024-03-23', 'Ricardo'),
	(6, '2024-03-24', 'Gabriela');

-- Volcando estructura para tabla leadgraphs.funcion
CREATE TABLE IF NOT EXISTS `funcion` (
  `IDFuncion` int(11) NOT NULL,
  `Accion` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`IDFuncion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla leadgraphs.funcion: ~18 rows (aproximadamente)
INSERT INTO `funcion` (`IDFuncion`, `Accion`) VALUES
	(1, 'Consultar grafica'),
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

-- Volcando estructura para tabla leadgraphs.funtion_rol
CREATE TABLE IF NOT EXISTS `funtion_rol` (
  `IDPosee` int(11) NOT NULL,
  `IDRol` int(11) DEFAULT NULL,
  `IDFuncion` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDPosee`),
  KEY `IDRol` (`IDRol`),
  KEY `IDFuncion` (`IDFuncion`),
  CONSTRAINT `funtion_rol_ibfk_1` FOREIGN KEY (`IDRol`) REFERENCES `roles` (`IDRol`),
  CONSTRAINT `funtion_rol_ibfk_2` FOREIGN KEY (`IDFuncion`) REFERENCES `funcion` (`IDFuncion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla leadgraphs.funtion_rol: ~39 rows (aproximadamente)
INSERT INTO `funtion_rol` (`IDPosee`, `IDRol`, `IDFuncion`) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 1, 3),
	(4, 2, 3),
	(5, 3, 3),
	(6, 1, 4),
	(7, 2, 4),
	(8, 3, 4),
	(9, 1, 5),
	(10, 2, 5),
	(11, 1, 6),
	(12, 2, 6),
	(13, 1, 7),
	(14, 1, 8),
	(15, 2, 8),
	(16, 1, 9),
	(17, 2, 9),
	(18, 1, 10),
	(19, 2, 10),
	(20, 1, 11),
	(21, 2, 11),
	(22, 1, 12),
	(23, 1, 12),
	(24, 1, 13),
	(25, 2, 13),
	(26, 3, 13),
	(27, 1, 14),
	(28, 2, 14),
	(29, 3, 14),
	(30, 1, 15),
	(31, 2, 15),
	(32, 3, 15),
	(33, 1, 16),
	(34, 2, 16),
	(35, 1, 17),
	(36, 2, 17),
	(37, 1, 18),
	(38, 2, 18),
	(39, 3, 18);

-- Volcando estructura para tabla leadgraphs.historial
CREATE TABLE IF NOT EXISTS `historial` (
  `IDHistorial` int(11) NOT NULL,
  `Fecha_Creacion_Historial` date DEFAULT NULL,
  `Fecha_Modificacion_Historial` date DEFAULT NULL,
  `Versiones` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IDHistorial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla leadgraphs.historial: ~7 rows (aproximadamente)
INSERT INTO `historial` (`IDHistorial`, `Fecha_Creacion_Historial`, `Fecha_Modificacion_Historial`, `Versiones`) VALUES
	(1, '2024-03-06', '2024-03-06', '1'),
	(2, '2024-03-06', '2024-03-07', '2'),
	(3, '2024-03-06', '2024-03-08', '3'),
	(4, '2024-03-06', '2024-03-09', '4'),
	(5, '2024-03-06', '2024-03-10', '5'),
	(6, '2024-03-06', '2024-03-11', '6'),
	(7, '2024-03-06', '2024-03-12', '7');

-- Volcando estructura para tabla leadgraphs.leads
CREATE TABLE IF NOT EXISTS `leads` (
  `IDLead` int(11) NOT NULL,
  `IDHistorial` int(11) DEFAULT NULL,
  `IDWorkspace` int(11) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Valor` float DEFAULT NULL,
  `Ganado` tinyint(1) DEFAULT NULL,
  `Correo` varchar(40) DEFAULT NULL,
  `Etiqueta` varchar(40) DEFAULT NULL,
  `Compania` varchar(100) DEFAULT NULL,
  `Creado` date DEFAULT NULL,
  `Hora_Creacion` time DEFAULT NULL,
  `Fecha_Primer_Mensaje` date DEFAULT NULL,
  `Hora_Primer_Mensaje` time DEFAULT NULL,
  `Primer_Mensaje` text DEFAULT NULL,
  `Fecha_Ultimo_Mensaje` date DEFAULT NULL,
  `Hora_Ultimo_Mensaje` time DEFAULT NULL,
  `Ultimo_Mensaje` text DEFAULT NULL,
  `Estado_Lead` varchar(40) DEFAULT NULL,
  `Seller_Asignado` varchar(100) DEFAULT NULL,
  `Embudo` varchar(50) DEFAULT NULL,
  `Etapa` varchar(50) DEFAULT NULL,
  `Archivado` varchar(10) DEFAULT NULL,
  `Creado_Manualmente` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`IDLead`),
  KEY `IDHistorial` (`IDHistorial`),
  KEY `IDWorkspace` (`IDWorkspace`),
  CONSTRAINT `leads_ibfk_1` FOREIGN KEY (`IDHistorial`) REFERENCES `historial` (`IDHistorial`),
  CONSTRAINT `leads_ibfk_2` FOREIGN KEY (`IDWorkspace`) REFERENCES `workspace` (`IDWorkspace`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla leadgraphs.leads: ~50 rows (aproximadamente)
INSERT INTO `leads` (`IDLead`, `IDHistorial`, `IDWorkspace`, `Telefono`, `Nombre`, `Valor`, `Ganado`, `Correo`, `Etiqueta`, `Compania`, `Creado`, `Hora_Creacion`, `Fecha_Primer_Mensaje`, `Hora_Primer_Mensaje`, `Primer_Mensaje`, `Fecha_Ultimo_Mensaje`, `Hora_Ultimo_Mensaje`, `Ultimo_Mensaje`, `Estado_Lead`, `Seller_Asignado`, `Embudo`, `Etapa`, `Archivado`, `Creado_Manualmente`) VALUES
	(1, 1, 1, '555-1234', 'Pedro', 1000, 1, 'Pedro@gmail.com', 'Importante', 'ABC', '2024-03-06', '12:00:00', '2024-03-06', '12:30:00', 'Buenos días ', '2024-06-03', '13:00:00', 'Gracias hasta luego', 'Ended', 'John', 'Presales', 'Contactados', 'true', 0),
	(2, 1, 1, '555-5678', 'María', 1500, 0, 'maria@gmail.com', 'Normal', 'XYZ', '2024-03-07', '11:30:00', '2024-03-07', '12:00:00', 'Hola, ¿cómo estás?', '2024-06-04', '14:00:00', 'Nos vemos pronto', 'In progress', 'Sarah', 'Sales', 'Qualified', 'false', 1),
	(3, 1, 2, '555-9012', 'Juan', 2000, 1, 'juan@gmail.com', 'Urgente', 'DEF', '2024-03-08', '10:00:00', '2024-03-08', '10:30:00', 'Good morning', '2024-06-05', '15:00:00', 'See you later', 'New', 'Emily', 'Marketing', 'Cold', 'true', 0),
	(4, 1, 2, '555-3456', 'Ana', 1200, 1, 'ana@gmail.com', 'Importante', 'GHI', '2024-03-09', '09:30:00', '2024-03-09', '10:00:00', 'Hi there', '2024-06-06', '16:00:00', 'Take care', 'Qualified', 'Michael', 'Sales', 'Contacted', 'false', 1),
	(5, 1, 3, '555-6789', 'Luis', 1800, 0, 'luis@gmail.com', 'Normal', 'JKL', '2024-03-10', '08:45:00', '2024-03-10', '09:15:00', 'Hello!', '2024-06-07', '17:00:00', 'Have a great day', 'Cold', 'Sophia', 'Marketing', 'Contacted', 'true', 0),
	(6, 1, 3, '555-4321', 'Laura', 1600, 1, 'laura@gmail.com', 'Urgente', 'MNO', '2024-03-11', '14:00:00', '2024-03-11', '14:30:00', 'Hey!', '2024-06-08', '18:00:00', 'See you tomorrow', 'Qualified', 'David', 'Sales', 'Contacted', 'false', 1),
	(7, 2, 1, '555-7890', 'Carlos', 1400, 0, 'carlos@gmail.com', 'Normal', 'PQR', '2024-03-12', '13:30:00', '2024-03-12', '14:00:00', 'Hi!', '2024-06-09', '09:00:00', 'Goodbye', 'Cold', 'Emma', 'Marketing', 'Qualified', 'true', 0),
	(8, 2, 3, '555-8901', 'Marta', 1700, 1, 'marta@gmail.com', 'Importante', 'STU', '2024-03-13', '10:45:00', '2024-03-13', '11:15:00', 'Good morning', '2024-06-10', '10:30:00', 'See you later', 'New', 'Daniel', 'Presales', 'Contacted', 'false', 1),
	(9, 2, 3, '555-6789', 'Elena', 1900, 0, 'elena@gmail.com', 'Normal', 'VWX', '2024-03-14', '09:15:00', '2024-03-14', '09:45:00', 'Hello!', '2024-06-11', '11:00:00', 'Have a great day', 'Cold', 'Sophia', 'Marketing', 'Contacted', 'true', 0),
	(10, 2, 3, '555-1234', 'Diego', 1300, 1, 'diego@gmail.com', 'Urgente', 'YZA', '2024-03-15', '12:30:00', '2024-03-15', '13:00:00', 'Hey there!', '2024-06-12', '12:30:00', 'Talk to you later', 'Qualified', 'Sarah', 'Sales', 'Contacted', 'false', 1),
	(11, 2, 4, '555-2345', 'Sara', 1400, 0, 'sara@gmail.com', 'Normal', 'ZAB', '2024-03-16', '11:45:00', '2024-03-16', '12:15:00', 'Hello!', '2024-06-13', '13:00:00', 'Take care', 'Cold', 'John', 'Marketing', 'Contacted', 'true', 0),
	(12, 2, 4, '555-3456', 'Mario', 1500, 1, 'mario@gmail.com', 'Importante', 'BCD', '2024-03-17', '10:15:00', '2024-03-17', '10:45:00', 'Good morning', '2024-06-14', '14:00:00', 'See you later', 'Qualified', 'Emily', 'Presales', 'Contacted', 'false', 1),
	(13, 3, 5, '555-4567', 'Lorena', 1600, 0, 'lorena@gmail.com', 'Normal', 'CDE', '2024-03-18', '09:30:00', '2024-03-18', '10:00:00', 'Hi there', '2024-06-15', '15:30:00', 'Goodbye', 'Cold', 'Michael', 'Marketing', 'Qualified', 'true', 0),
	(14, 3, 5, '555-5678', 'Camila', 1700, 1, 'camila@gmail.com', 'Urgente', 'EFG', '2024-03-19', '11:00:00', '2024-03-19', '11:30:00', 'Hello!', '2024-06-16', '16:00:00', 'See you tomorrow', 'New', 'Sophia', 'Sales', 'Contacted', 'false', 1),
	(15, 3, 6, '555-6789', 'Javier', 1800, 0, 'javier@gmail.com', 'Normal', 'GHI', '2024-03-20', '10:30:00', '2024-03-20', '11:00:00', 'Hey there!', '2024-06-17', '17:30:00', 'Talk to you later', 'Cold', 'Daniel', 'Marketing', 'Qualified', 'true', 0),
	(16, 3, 6, '555-7890', 'Lucía', 1900, 1, 'lucia@gmail.com', 'Importante', 'HIJ', '2024-03-21', '09:45:00', '2024-03-21', '10:15:00', 'Good morning', '2024-06-18', '12:00:00', 'See you later', 'Qualified', 'Emma', 'Presales', 'Contacted', 'false', 1),
	(17, 3, 7, '555-8901', 'Marcos', 2000, 0, 'marcos@gmail.com', 'Normal', 'IJK', '2024-03-22', '11:00:00', '2024-03-22', '11:30:00', 'Hi!', '2024-06-19', '14:30:00', 'Goodbye', 'Cold', 'Sarah', 'Marketing', 'Qualified', 'true', 0),
	(18, 3, 7, '555-9012', 'Ana María', 2200, 1, 'anamaria@gmail.com', 'Urgente', 'JKL', '2024-03-23', '10:15:00', '2024-03-23', '10:45:00', 'Hello!', '2024-06-20', '13:00:00', 'Take care', 'New', 'John', 'Sales', 'Contacted', 'false', 1),
	(19, 4, 8, '555-2345', 'Gabriel', 1800, 0, 'gabriel@gmail.com', 'Normal', 'KLM', '2024-03-24', '12:00:00', '2024-03-24', '12:30:00', 'Hey there!', '2024-06-21', '15:30:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', 0),
	(20, 4, 8, '555-3456', 'Carolina', 1900, 1, 'carolina@gmail.com', 'Importante', 'MNO', '2024-03-25', '11:30:00', '2024-03-25', '12:00:00', 'Good morning', '2024-06-22', '16:00:00', 'See you later', 'Qualified', 'David', 'Presales', 'Contacted', 'false', 1),
	(21, 4, 9, '555-4567', 'Daniel', 2000, 0, 'daniel@gmail.com', 'Normal', 'NOP', '2024-03-26', '09:00:00', '2024-03-26', '09:30:00', 'Hi there', '2024-06-23', '10:30:00', 'Goodbye', 'Cold', 'Emily', 'Marketing', 'Qualified', 'true', 0),
	(22, 4, 9, '555-5678', 'Alejandro', 2100, 1, 'alejandro@gmail.com', 'Urgente', 'PQR', '2024-03-27', '10:45:00', '2024-03-27', '11:15:00', 'Hello!', '2024-06-24', '12:00:00', 'See you tomorrow', 'New', 'Michael', 'Sales', 'Contacted', 'false', 1),
	(23, 4, 10, '555-6789', 'Valeria', 2200, 0, 'valeria@gmail.com', 'Normal', 'QRS', '2024-03-28', '12:30:00', '2024-03-28', '13:00:00', 'Hey there!', '2024-06-25', '14:30:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', 0),
	(24, 4, 10, '555-7890', 'Lucas', 2300, 1, 'lucas@gmail.com', 'Importante', 'RST', '2024-03-29', '13:15:00', '2024-03-29', '13:45:00', 'Good morning', '2024-06-26', '15:00:00', 'See you later', 'Qualified', 'Emma', 'Presales', 'Contacted', 'false', 1),
	(25, 5, 11, '555-9012', 'Paula', 2400, 0, 'paula@gmail.com', 'Normal', 'STU', '2024-03-30', '14:00:00', '2024-03-30', '14:30:00', 'Hi!', '2024-06-27', '16:30:00', 'Goodbye', 'Cold', 'John', 'Marketing', 'Qualified', 'true', 0),
	(26, 5, 11, '555-1234', 'Julia', 2500, 1, 'julia@gmail.com', 'Urgente', 'TUV', '2024-03-31', '15:30:00', '2024-03-31', '16:00:00', 'Hello!', '2024-06-28', '09:00:00', 'Take care', 'New', 'Michael', 'Sales', 'Contacted', 'false', 1),
	(27, 5, 12, '555-2345', 'Mateo', 2600, 0, 'mateo@gmail.com', 'Normal', 'UVW', '2024-04-01', '16:45:00', '2024-04-01', '17:15:00', 'Hey there!', '2024-06-29', '10:30:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', 0),
	(28, 5, 12, '555-3456', 'Isabella', 2700, 1, 'isabella@gmail.com', 'Importante', 'VWX', '2024-04-02', '17:00:00', '2024-04-02', '17:30:00', 'Good morning', '2024-06-30', '11:45:00', 'See you later', 'Qualified', 'Emma', 'Presales', 'Contacted', 'false', 1),
	(29, 5, 13, '555-4567', 'David', 2800, 0, 'david@gmail.com', 'Normal', 'WXY', '2024-04-03', '09:30:00', '2024-04-03', '10:00:00', 'Hi there', '2024-07-01', '13:00:00', 'Goodbye', 'Cold', 'John', 'Marketing', 'Qualified', 'true', 0),
	(30, 5, 13, '555-5678', 'Valentina', 2900, 1, 'valentina@gmail.com', 'Urgente', 'XYZ', '2024-04-04', '10:45:00', '2024-04-04', '11:15:00', 'Hello!', '2024-07-02', '14:30:00', 'See you tomorrow', 'New', 'Michael', 'Sales', 'Contacted', 'false', 1),
	(31, 5, 14, '555-6789', 'Martín', 3000, 0, 'martin@gmail.com', 'Normal', 'YZA', '2024-04-05', '11:30:00', '2024-04-05', '12:00:00', 'Hi!', '2024-07-03', '15:00:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', 0),
	(32, 5, 14, '555-7890', 'Carla', 3100, 1, 'carla@gmail.com', 'Importante', 'ZAB', '2024-04-06', '12:15:00', '2024-04-06', '12:45:00', 'Good morning', '2024-07-04', '09:30:00', 'See you later', 'Qualified', 'Emma', 'Presales', 'Contacted', 'false', 1),
	(33, 6, 15, '555-9012', 'Julián', 3200, 0, 'julian@gmail.com', 'Normal', 'ABC', '2024-04-07', '13:00:00', '2024-04-07', '13:30:00', 'Hello!', '2024-07-05', '10:45:00', 'Goodbye', 'Cold', 'John', 'Marketing', 'Qualified', 'true', 0),
	(34, 6, 15, '555-2345', 'Fernanda', 3300, 1, 'fernanda@gmail.com', 'Urgente', 'BCD', '2024-04-08', '14:30:00', '2024-04-08', '15:00:00', 'Hey there!', '2024-07-06', '11:00:00', 'Take care', 'New', 'Michael', 'Sales', 'Contacted', 'false', 1),
	(35, 6, 16, '555-3456', 'Juan', 3400, 0, 'juan@gmail.com', 'Normal', 'CDE', '2024-04-09', '15:45:00', '2024-04-09', '16:15:00', 'Hi there', '2024-07-07', '12:15:00', 'Goodbye', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', 0),
	(36, 6, 16, '555-4567', 'María', 3500, 1, 'maria@gmail.com', 'Importante', 'DEF', '2024-04-10', '16:30:00', '2024-04-10', '17:00:00', 'Hello!', '2024-07-08', '13:30:00', 'See you tomorrow', 'New', 'Michael', 'Sales', 'Contacted', 'false', 1),
	(37, 6, 17, '555-5678', 'Diego', 3600, 0, 'diego@gmail.com', 'Normal', 'EFG', '2024-04-11', '17:45:00', '2024-04-11', '18:15:00', 'Hi!', '2024-07-09', '14:45:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', 0),
	(38, 6, 17, '555-6789', 'Sofía', 3700, 1, 'sofia@gmail.com', 'Urgente', 'FGH', '2024-04-12', '09:00:00', '2024-04-12', '09:30:00', 'Hey there!', '2024-07-10', '15:00:00', 'Take care', 'New', 'Michael', 'Sales', 'Contacted', 'false', 1),
	(39, 7, 18, '555-7890', 'Lucas', 3800, 0, 'lucas@gmail.com', 'Normal', 'GHI', '2024-04-13', '09:30:00', '2024-04-13', '10:00:00', 'Hello!', '2024-07-11', '16:15:00', 'Goodbye', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', 0),
	(40, 7, 18, '555-9012', 'Valentina', 3900, 1, 'valentina@gmail.com', 'Importante', 'HIJ', '2024-04-14', '10:00:00', '2024-04-14', '10:30:00', 'Good morning', '2024-07-12', '09:45:00', 'See you later', 'Qualified', 'Emma', 'Presales', 'Contacted', 'false', 1),
	(41, 7, 19, '555-2345', 'Juan Pablo', 4000, 0, 'juanpablo@gmail.com', 'Normal', 'IJK', '2024-04-15', '11:15:00', '2024-04-15', '11:45:00', 'Hi!', '2024-07-13', '10:00:00', 'Goodbye', 'Cold', 'John', 'Marketing', 'Qualified', 'true', 0),
	(42, 7, 19, '555-3456', 'Isabel', 4100, 1, 'isabel@gmail.com', 'Urgente', 'JKL', '2024-04-16', '12:00:00', '2024-04-16', '12:30:00', 'Hello!', '2024-07-14', '11:15:00', 'Take care', 'New', 'Michael', 'Sales', 'Contacted', 'false', 1),
	(43, 7, 20, '555-4567', 'Martina', 4200, 0, 'martina@gmail.com', 'Normal', 'KLM', '2024-04-17', '12:45:00', '2024-04-17', '13:15:00', 'Hi there', '2024-07-15', '12:30:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', 0),
	(44, 7, 20, '555-5678', 'Gabriel', 4300, 1, 'gabriel@gmail.com', 'Importante', 'LMN', '2024-04-18', '13:30:00', '2024-04-18', '14:00:00', 'Good morning', '2024-07-16', '13:45:00', 'See you later', 'Qualified', 'Emma', 'Presales', 'Contacted', 'false', 1),
	(45, 7, 10, '555-6789', 'Camila', 4400, 0, 'camila@gmail.com', 'Normal', 'MNO', '2024-04-19', '14:15:00', '2024-04-19', '14:45:00', 'Hello!', '2024-07-17', '14:00:00', 'Goodbye', 'Cold', 'John', 'Marketing', 'Qualified', 'true', 0),
	(46, 7, 10, '555-7890', 'Tomás', 4500, 1, 'tomas@gmail.com', 'Urgente', 'NOP', '2024-04-20', '15:00:00', '2024-04-20', '15:30:00', 'Hey there!', '2024-07-18', '15:15:00', 'Take care', 'New', 'Michael', 'Sales', 'Contacted', 'false', 1),
	(47, 7, 10, '555-9012', 'Isabella', 4600, 0, 'isabella@gmail.com', 'Normal', 'OPQ', '2024-04-21', '15:30:00', '2024-04-21', '16:00:00', 'Hi!', '2024-07-19', '16:30:00', 'Talk to you later', 'Cold', 'Sophia', 'Marketing', 'Qualified', 'true', 0),
	(48, 7, 10, '555-1234', 'Matías', 4700, 1, 'matias@gmail.com', 'Importante', 'PQR', '2024-04-22', '16:00:00', '2024-04-22', '16:30:00', 'Hello!', '2024-07-20', '17:00:00', 'See you tomorrow', 'New', 'Michael', 'Sales', 'Contacted', 'false', 1),
	(49, 7, 10, '555-2345', 'Valeria', 4800, 0, 'valeria@gmail.com', 'Normal', 'QRS', '2024-04-23', '16:30:00', '2024-04-23', '17:00:00', 'Hi there', '2024-07-21', '17:30:00', 'Goodbye', 'Cold', 'John', 'Marketing', 'Qualified', 'true', 0),
	(50, 7, 10, '555-3456', 'Emilio', 4900, 1, 'emilio@gmail.com', 'Urgente', 'RST', '2024-04-24', '17:00:00', '2024-04-24', '17:30:00', 'Hey there!', '2024-07-22', '18:00:00', 'Take care', 'New', 'Michael', 'Sales', 'Contacted', 'false', 1);

-- Volcando estructura para tabla leadgraphs.lead_contenedor
CREATE TABLE IF NOT EXISTS `lead_contenedor` (
  `IDGenerado` int(11) NOT NULL,
  `IDContenedor` int(11) DEFAULT NULL,
  `IDLead` int(11) DEFAULT NULL,
  `Fecha_Generacion` date DEFAULT NULL,
  PRIMARY KEY (`IDGenerado`),
  KEY `IDContenedor` (`IDContenedor`),
  KEY `IDLead` (`IDLead`),
  CONSTRAINT `lead_contenedor_ibfk_1` FOREIGN KEY (`IDContenedor`) REFERENCES `contenedor` (`IDContenedor`),
  CONSTRAINT `lead_contenedor_ibfk_2` FOREIGN KEY (`IDLead`) REFERENCES `leads` (`IDLead`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla leadgraphs.lead_contenedor: ~20 rows (aproximadamente)
INSERT INTO `lead_contenedor` (`IDGenerado`, `IDContenedor`, `IDLead`, `Fecha_Generacion`) VALUES
	(1, 1, 1, '2024-03-06'),
	(2, 1, 2, '2024-03-08'),
	(3, 2, 3, '2023-11-15'),
	(4, 2, 4, '2022-07-25'),
	(5, 3, 5, '2021-04-10'),
	(6, 3, 6, '2020-09-03'),
	(7, 4, 7, '2019-12-28'),
	(8, 4, 8, '2018-06-20'),
	(9, 5, 9, '2017-01-14'),
	(10, 5, 10, '2016-08-07'),
	(11, 6, 11, '2015-02-19'),
	(12, 6, 12, '2014-10-22'),
	(13, 4, 13, '2013-05-30'),
	(14, 4, 14, '2012-11-01'),
	(15, 1, 15, '2011-07-11'),
	(16, 1, 16, '2010-03-24'),
	(17, 2, 17, '2009-09-11'),
	(18, 2, 18, '2008-04-05'),
	(19, 3, 19, '2007-12-17'),
	(20, 3, 20, '2006-06-26');

-- Volcando estructura para tabla leadgraphs.reporte
CREATE TABLE IF NOT EXISTS `reporte` (
  `IDReporte` int(11) NOT NULL,
  `IDContenedor` int(11) DEFAULT NULL,
  `Fecha_Creacion_Informe` date DEFAULT NULL,
  `Autor` varchar(100) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  PRIMARY KEY (`IDReporte`),
  KEY `IDContenedor` (`IDContenedor`),
  CONSTRAINT `reporte_ibfk_1` FOREIGN KEY (`IDContenedor`) REFERENCES `contenedor` (`IDContenedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla leadgraphs.reporte: ~11 rows (aproximadamente)
INSERT INTO `reporte` (`IDReporte`, `IDContenedor`, `Fecha_Creacion_Informe`, `Autor`, `Descripcion`) VALUES
	(1, 1, '2024-03-06', 'Juan', 'Informe del día 2024-03-06'),
	(2, 1, '2024-03-07', 'Carlos', 'Informe del día 2024-03-07'),
	(3, 2, '2024-03-08', 'Ana', 'Informe del día 2024-03-08'),
	(4, 2, '2024-03-09', 'David', 'Informe del día 2024-03-09'),
	(5, 3, '2024-03-10', 'Elena', 'Informe del día 2024-03-10'),
	(6, 3, '2024-03-11', 'Fernando', 'Informe del día 2024-03-11'),
	(7, 4, '2024-03-12', 'Gabriela', 'Informe del día 2024-03-12'),
	(8, 4, '2024-03-13', 'Hugo', 'Informe del día 2024-03-13'),
	(9, 5, '2024-03-14', 'Isabel', 'Informe del día 2024-03-14'),
	(10, 6, '2024-03-15', 'Juan', 'Informe del día 2024-03-15'),
	(11, 6, '2024-03-16', 'Carlos', 'Informe del día 2024-03-16');

-- Volcando estructura para tabla leadgraphs.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `IDRol` int(11) NOT NULL,
  `Descripcion_Rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IDRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla leadgraphs.roles: ~3 rows (aproximadamente)
INSERT INTO `roles` (`IDRol`, `Descripcion_Rol`) VALUES
	(1, 'Owner'),
	(2, 'Admin'),
	(3, 'Seller');

-- Volcando estructura para tabla leadgraphs.rol_usuario
CREATE TABLE IF NOT EXISTS `rol_usuario` (
  `IDTiene` int(11) NOT NULL,
  `IDUsuario` int(11) DEFAULT NULL,
  `IDRol` int(11) DEFAULT NULL,
  `Fecha_Asignacion` date DEFAULT NULL,
  PRIMARY KEY (`IDTiene`),
  KEY `IDUsuario` (`IDUsuario`),
  KEY `IDRol` (`IDRol`),
  CONSTRAINT `rol_usuario_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`),
  CONSTRAINT `rol_usuario_ibfk_2` FOREIGN KEY (`IDRol`) REFERENCES `roles` (`IDRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla leadgraphs.rol_usuario: ~20 rows (aproximadamente)
INSERT INTO `rol_usuario` (`IDTiene`, `IDUsuario`, `IDRol`, `Fecha_Asignacion`) VALUES
	(1, 1, 1, '2024-03-06'),
	(2, 2, 1, '2024-03-07'),
	(3, 3, 1, '2024-03-08'),
	(4, 4, 1, '2024-03-09'),
	(5, 5, 1, '2024-03-10'),
	(6, 6, 2, '2024-03-11'),
	(7, 7, 2, '2024-03-12'),
	(8, 8, 2, '2024-03-13'),
	(9, 9, 2, '2024-03-14'),
	(10, 10, 2, '2024-03-15'),
	(11, 11, 3, '2024-03-16'),
	(12, 12, 3, '2024-03-17'),
	(13, 13, 3, '2024-03-18'),
	(14, 14, 3, '2024-03-19'),
	(15, 15, 3, '2024-03-20'),
	(16, 16, 3, '2024-03-21'),
	(17, 17, 3, '2024-03-22'),
	(18, 18, 3, '2024-03-23'),
	(19, 19, 3, '2024-03-24'),
	(20, 20, 3, '2024-03-25');

-- Volcando estructura para tabla leadgraphs.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `IDUsuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) DEFAULT NULL,
  `Celular` varchar(20) DEFAULT NULL,
  `Correo` varchar(40) DEFAULT NULL,
  `Contrasena` varchar(600) DEFAULT NULL,
  `Fecha_Ingreso` date DEFAULT NULL,
  `Habilitado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`IDUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla leadgraphs.usuario: ~20 rows (aproximadamente)
INSERT INTO `usuario` (`IDUsuario`, `nombre_usuario`, `Celular`, `Correo`, `Contrasena`, `Fecha_Ingreso`, `Habilitado`) VALUES
	(1, 'Juan', '123-456-7890', 'Juane@gmail.com', 'securepassword', '2024-03-06', 1),
	(2, 'Alejandra', '555-111-2222', 'alejandra@gmail.com', 'password123', '2024-03-07', 1),
	(3, 'Miguel', '555-333-4444', 'miguel@gmail.com', 'miguelito123', '2024-03-08', 1),
	(4, 'Karla', '555-555-6666', 'karla@gmail.com', 'karlita456', '2024-03-09', 1),
	(5, 'Ricardo', '555-777-8888', 'ricardo@gmail.com', 'ricardito789', '2024-03-10', 1),
	(6, 'Gabriela', '555-999-0000', 'gabriela@gmail.com', 'gaby567', '2024-03-11', 1),
	(7, 'Javier', '555-222-3333', 'javier@gmail.com', 'javi890', '2024-03-12', 1),
	(8, 'María', '555-444-5555', 'maria@gmail.com', 'marita123', '2024-03-13', 1),
	(9, 'Carlos', '555-666-7777', 'carlos@gmail.com', 'carlitos456', '2024-03-14', 1),
	(10, 'Laura', '555-888-9999', 'laura@gmail.com', 'laurita789', '2024-03-15', 1),
	(11, 'Eduardo', '555-000-1111', 'eduardo@gmail.com', 'edu567', '2024-03-16', 1),
	(12, 'Ana', '555-222-3333', 'ana@gmail.com', 'ana890', '2024-03-17', 1),
	(13, 'José', '555-444-5555', 'jose@gmail.com', 'jose123', '2024-03-18', 1),
	(14, 'Verónica', '555-666-7777', 'veronica@gmail.com', 'vero456', '2024-03-19', 1),
	(15, 'Francisco', '555-888-9999', 'francisco@gmail.com', 'fran789', '2024-03-20', 1),
	(16, 'Silvia', '555-111-2222', 'silvia@gmail.com', 'silvi123', '2024-03-21', 1),
	(17, 'Raul', '555-333-4444', 'raul@gmail.com', 'raulito456', '2024-03-22', 1),
	(18, 'Patricia', '555-555-6666', 'patricia@gmail.com', 'patty789', '2024-03-23', 1),
	(19, 'Héctor', '555-777-8888', 'hector@gmail.com', 'hect123', '2024-03-24', 1),
	(20, 'Carmen', '555-999-0000', 'carmen@gmail.com', 'carmencita456', '2024-03-25', 1);

-- Volcando estructura para tabla leadgraphs.usuario_workspace
CREATE TABLE IF NOT EXISTS `usuario_workspace` (
  `IDCreacion` int(11) NOT NULL,
  `IDWorkspace` int(11) DEFAULT NULL,
  `IDUsuario` int(11) DEFAULT NULL,
  `Fecha_Creacion` date DEFAULT NULL,
  PRIMARY KEY (`IDCreacion`),
  KEY `IDWorkspace` (`IDWorkspace`),
  KEY `IDUsuario` (`IDUsuario`),
  CONSTRAINT `usuario_workspace_ibfk_1` FOREIGN KEY (`IDWorkspace`) REFERENCES `workspace` (`IDWorkspace`),
  CONSTRAINT `usuario_workspace_ibfk_2` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla leadgraphs.usuario_workspace: ~5 rows (aproximadamente)
INSERT INTO `usuario_workspace` (`IDCreacion`, `IDWorkspace`, `IDUsuario`, `Fecha_Creacion`) VALUES
	(1, 1, 1, '2024-03-06'),
	(2, 2, 2, '2024-03-07'),
	(3, 3, 3, '2024-03-08'),
	(4, 4, 4, '2024-03-09'),
	(5, 5, 5, '2024-03-10');

-- Volcando estructura para tabla leadgraphs.workspace
CREATE TABLE IF NOT EXISTS `workspace` (
  `IDWorkspace` int(11) NOT NULL,
  `Numero_Versiones` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDWorkspace`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla leadgraphs.workspace: ~20 rows (aproximadamente)
INSERT INTO `workspace` (`IDWorkspace`, `Numero_Versiones`) VALUES
	(1, 2),
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

CREATE TABLE `usuario_prueba` (
  `IDUsuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) DEFAULT NULL,
  `Celular` varchar(20) DEFAULT NULL,
  `Correo` varchar(40) DEFAULT NULL,
  `Contrasena` varchar(600) DEFAULT NULL,
  `Fecha_Ingreso` date DEFAULT NULL,
  `Habilitado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`IDUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

INSERT INTO `usuario_prueba` (`IDUsuario`, `nombre_usuario`, `Celular`, `Correo`, `Contrasena`, `Fecha_Ingreso`, `Habilitado`) VALUES
(12, 'Ana', '555-222-3333', 'ana@gmail.com', 'ana890', '2024-03-17', 1);


/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
