-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (x86_64)
--
-- Host: localhost    Database: leadgraphs
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contenedor`
--

DROP TABLE IF EXISTS `contenedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenedor` (
  `IDContenedor` int NOT NULL,
  `Fecha_Creacion_Contenedor` date DEFAULT NULL,
  `Autor` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`IDContenedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `funcion`
--

DROP TABLE IF EXISTS `funcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcion` (
  `IDFuncion` int NOT NULL,
  `Accion` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`IDFuncion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `funtion_rol`
--

DROP TABLE IF EXISTS `funtion_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funtion_rol` (
  `IDPosee` int NOT NULL,
  `IDRol` int DEFAULT NULL,
  `IDFuncion` int DEFAULT NULL,
  PRIMARY KEY (`IDPosee`),
  KEY `IDRol` (`IDRol`),
  KEY `IDFuncion` (`IDFuncion`),
  CONSTRAINT `funtion_rol_ibfk_1` FOREIGN KEY (`IDRol`) REFERENCES `roles` (`IDRol`),
  CONSTRAINT `funtion_rol_ibfk_2` FOREIGN KEY (`IDFuncion`) REFERENCES `funcion` (`IDFuncion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `historial`
--

DROP TABLE IF EXISTS `historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial` (
  `IDRegistro` int NOT NULL AUTO_INCREMENT,
  `IDUsuario` int NOT NULL,
  `IDHistorial` int NOT NULL,
  `nombre_historial` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `accion` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_accion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IDRegistro`),
  KEY `IDUsuario_idx` (`IDUsuario`),
  KEY `IDHisrtorial_idx` (`IDHistorial`),
  CONSTRAINT `IDUsuario` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_contenedor`
--

DROP TABLE IF EXISTS `lead_contenedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lead_contenedor` (
  `IDGenerado` int NOT NULL AUTO_INCREMENT,
  `IDContenedor` int DEFAULT NULL,
  `IDLead` int DEFAULT NULL,
  `Fecha_Generacion` date DEFAULT NULL,
  PRIMARY KEY (`IDGenerado`),
  KEY `IDContenedor` (`IDContenedor`),
  KEY `lead_contenedor_ibfk_1_idx` (`IDLead`),
  CONSTRAINT `lead_contenedor_ibfk_1` FOREIGN KEY (`IDContenedor`) REFERENCES `contenedor` (`IDContenedor`),
  CONSTRAINT `lead_contenedor_ibfk_2` FOREIGN KEY (`IDLead`) REFERENCES `leads` (`IDLead`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `leads`
--

DROP TABLE IF EXISTS `leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leads` (
  `IDLead` int NOT NULL AUTO_INCREMENT,
  `IDHistorial` int NOT NULL,
  `IDWorkspace` int NOT NULL,
  `Telefono` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Nombre` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Valor` float DEFAULT NULL,
  `Ganado` tinyint(1) DEFAULT NULL,
  `Correo` varchar(40) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Etiqueta` varchar(40) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Compania` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Creado` date DEFAULT NULL,
  `Hora_Creacion` time DEFAULT NULL,
  `Fecha_Primer_Mensaje` date DEFAULT NULL,
  `Hora_Primer_Mensaje` time DEFAULT NULL,
  `Primer_Mensaje` text COLLATE utf8mb4_general_ci,
  `Fecha_Ultimo_Mensaje` date DEFAULT NULL,
  `Hora_Ultimo_Mensaje` time DEFAULT NULL,
  `Ultimo_Mensaje` text COLLATE utf8mb4_general_ci,
  `Estado_Lead` varchar(40) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Seller_Asignado` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Embudo` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Etapa` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Archivado` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Creado_Manualmente` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`IDLead`),
  KEY `IDWorkspace` (`IDWorkspace`),
  KEY `leads_ibfk_1_idx` (`IDHistorial`),
  KEY `leads_ibfk_2_idx` (`IDHistorial`),
  CONSTRAINT `leads_ibfk_1` FOREIGN KEY (`IDWorkspace`) REFERENCES `workspace` (`IDWorkspace`),
  CONSTRAINT `leads_ibfk_2` FOREIGN KEY (`IDHistorial`) REFERENCES `historial` (`IDHistorial`)
) ENGINE=InnoDB AUTO_INCREMENT=300 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reporte`
--

DROP TABLE IF EXISTS `reporte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reporte` (
  `IDReporte` int NOT NULL,
  `IDContenedor` int DEFAULT NULL,
  `Fecha_Creacion_Informe` date DEFAULT NULL,
  `Autor` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Descripcion` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`IDReporte`),
  KEY `IDContenedor` (`IDContenedor`),
  CONSTRAINT `reporte_ibfk_1` FOREIGN KEY (`IDContenedor`) REFERENCES `contenedor` (`IDContenedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rol_usuario`
--

DROP TABLE IF EXISTS `rol_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_usuario` (
  `IDTiene` int NOT NULL AUTO_INCREMENT,
  `IDUsuario` int DEFAULT NULL,
  `IDRol` int DEFAULT NULL,
  `Fecha_Asignacion` date DEFAULT NULL,
  PRIMARY KEY (`IDTiene`),
  KEY `IDRol` (`IDRol`),
  KEY `rol_usuario_ibfk_1_idx` (`IDUsuario`),
  CONSTRAINT `rol_usuario_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`),
  CONSTRAINT `rol_usuario_ibfk_2` FOREIGN KEY (`IDRol`) REFERENCES `roles` (`IDRol`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `IDRol` int NOT NULL,
  `Descripcion_Rol` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`IDRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `IDUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Celular` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Correo` varchar(40) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Contrasena` varchar(600) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Fecha_Ingreso` date DEFAULT NULL,
  `Habilitado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`IDUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario_prueba`
--

DROP TABLE IF EXISTS `usuario_prueba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_prueba` (
  `IDUsuario` int NOT NULL,
  `nombre_usuario` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Celular` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Correo` varchar(40) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Contrasena` varchar(600) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Fecha_Ingreso` date DEFAULT NULL,
  `Habilitado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`IDUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario_workspace`
--

DROP TABLE IF EXISTS `usuario_workspace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_workspace` (
  `IDCreacion` int NOT NULL,
  `IDWorkspace` int DEFAULT NULL,
  `IDUsuario` int DEFAULT NULL,
  `Fecha_Creacion` date DEFAULT NULL,
  PRIMARY KEY (`IDCreacion`),
  KEY `IDWorkspace` (`IDWorkspace`),
  KEY `usuario_workspace_ibfk_2_idx` (`IDUsuario`),
  CONSTRAINT `usuario_workspace_ibfk_1` FOREIGN KEY (`IDWorkspace`) REFERENCES `workspace` (`IDWorkspace`),
  CONSTRAINT `usuario_workspace_ibfk_2` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IDUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workspace`
--

DROP TABLE IF EXISTS `workspace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workspace` (
  `IDWorkspace` int NOT NULL,
  `Numero_Versiones` int DEFAULT NULL,
  PRIMARY KEY (`IDWorkspace`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'leadgraphs'
--
/*!50003 DROP FUNCTION IF EXISTS `getAverage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getAverage`(startDate Date, endDate Date) RETURNS float
    READS SQL DATA
BEGIN
	DECLARE promedio_result FLOAT;

    SELECT AVG(cantidad_registros)
    INTO promedio_result
    FROM (
        SELECT COUNT(*) AS cantidad_registros
        FROM leads
        WHERE Creado BETWEEN startDate AND endDate
        GROUP BY MONTH(Creado)
    ) AS registros_por_mes;

    RETURN promedio_result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getMax` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getMax`(startDate DATE, endDate DATE) RETURNS int
    READS SQL DATA
BEGIN
    DECLARE maximo_result INT;

    SELECT MAX(cantidad_registros)
    INTO maximo_result
    FROM (
        SELECT COUNT(*) AS cantidad_registros
        FROM leads
        WHERE Creado BETWEEN startDate AND endDate
        GROUP BY MONTH(Creado)
    ) AS registros_por_mes;

    RETURN maximo_result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getMin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getMin`(startDate DATE, endDate DATE) RETURNS int
    READS SQL DATA
BEGIN
    DECLARE minimo_result INT;

    SELECT MIN(cantidad_registros)
    INTO minimo_result
    FROM (
        SELECT COUNT(*) AS cantidad_registros
        FROM leads
        WHERE Creado BETWEEN startDate AND endDate
        GROUP BY MONTH(Creado)
    ) AS registros_por_mes;

    RETURN minimo_result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteLead` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteLead`(IN uIDLead INT)
BEGIN
	DELETE FROM lead_contenedor
    WHERE IDLead = uIDLead;
    
    DELETE FROM leads
    WHERE IDLead = uIDLead;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertarRolUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarRolUsuario`(IN _IDUsuario INT, IN _IDRol INT)
BEGIN
    INSERT INTO rol_usuario (IDUsuario, IDRol, Fecha_Asignacion)
    VALUES (_IDUsuario, _IDRol, CURRENT_TIMESTAMP());
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `obtenerUsuarioYAsignarRol` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerUsuarioYAsignarRol`(
    IN _nombre_usuario VARCHAR(255), 
    IN _correo VARCHAR(255), 
    IN _IDRol INT
)
BEGIN
    DECLARE usuario_id INT;
    
    -- Obtener el IDUsuario basado en el nombre de usuario y el correo electrónico
    SELECT IDUsuario INTO usuario_id
    FROM usuario
    WHERE nombre_usuario = _nombre_usuario AND correo = _correo;
    
    -- Si se encontró un IDUsuario válido
    IF usuario_id IS NOT NULL THEN
        -- Llamar al procedimiento insertarRolUsuario con el IDUsuario obtenido y el rol proporcionado
        CALL insertarRolUsuario(usuario_id, _IDRol);
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-17 13:21:33