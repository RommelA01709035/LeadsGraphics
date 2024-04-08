-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.3.2-MariaDB - mariadb.org binary distribution
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

-- Volcando datos para la tabla leadgraphs.usuario: ~20 rows (aproximadamente)
REPLACE INTO `usuario` (`IDUsuario`, `nombre_usuario`, `Celular`, `Correo`, `Contrasena`, `Fecha_Ingreso`, `Habilitado`, `matricula`) VALUES
	(1, 'Juan', '123-456-7890', 'Juane@gmail.com', 'securepassword', '2024-03-06', 1, NULL),
	(2, 'Alejandra', '555-111-2222', 'alejandra@gmail.com', 'password123', '2024-03-07', 1, NULL),
	(3, 'Miguel', '555-333-4444', 'miguel@gmail.com', 'miguelito123', '2024-03-08', 1, NULL),
	(4, 'Karla', '555-555-6666', 'karla@gmail.com', 'karlita456', '2024-03-09', 1, NULL),
	(5, 'Ricardo', '555-777-8888', 'ricardo@gmail.com', 'ricardito789', '2024-03-10', 1, NULL),
	(6, 'Gabriela', '555-999-0000', 'gabriela@gmail.com', 'gaby567', '2024-03-11', 1, NULL),
	(7, 'Javier', '555-222-3333', 'javier@gmail.com', 'javi890', '2024-03-12', 1, NULL),
	(8, 'María', '555-444-5555', 'maria@gmail.com', 'marita123', '2024-03-13', 1, NULL),
	(9, 'Carlos', '555-666-7777', 'carlos@gmail.com', 'carlitos456', '2024-03-14', 1, NULL),
	(10, 'Laura', '555-888-9999', 'laura@gmail.com', 'laurita789', '2024-03-15', 1, NULL),
	(11, 'Eduardo', '555-000-1111', 'eduardo@gmail.com', 'edu567', '2024-03-16', 1, NULL),
	(12, 'Ana', '555-222-3333', 'ana123@yahoo.com', 'ana890', '2024-03-17', 1, NULL),
	(13, 'José', '555-444-5555', 'jose@gmail.com', 'jose123', '2024-03-18', 1, NULL),
	(14, 'Verónica', '555-666-7777', 'veronica@gmail.com', 'vero456', '2024-03-19', 1, NULL),
	(15, 'Francisco', '555-888-9999', 'francisco@gmail.com', 'fran789', '2024-03-20', 1, NULL),
	(16, 'Silvia', '555-111-2222', 'silvia@gmail.com', 'silvi123', '2024-03-21', 1, NULL),
	(17, 'Raul', '555-333-4444', 'raul@gmail.com', 'raulito456', '2024-03-22', 1, NULL),
	(18, 'Patricia', '555-555-6666', 'patricia@gmail.com', 'patty789', '2024-03-23', 1, NULL),
	(19, 'Héctor', '555-777-8888', 'hector@gmail.com', 'hect123', '2024-03-24', 1, NULL),
	(20, 'Carmen', '555-999-0000', 'carmen@gmail.com', 'carmencita456', '2024-03-25', 1, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
