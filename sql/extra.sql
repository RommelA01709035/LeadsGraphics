

DELIMITER //

CREATE FUNCTION getAverage(startDate DATE, endDate DATE)
RETURNS FLOAT
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
END //

DELIMITER ;


DELIMITER //

CREATE FUNCTION getMax(startDate DATE, endDate DATE)
RETURNS INT
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
END //

DELIMITER ;

DELIMITER //

CREATE FUNCTION getMin(startDate DATE, endDate DATE)
RETURNS INT
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
END //

DELIMITER //

CREATE PROCEDURE generarMatricula(IN _nombre_usuario VARCHAR(255), IN _Correo VARCHAR(40), OUT nueva_matricula VARCHAR(10))
BEGIN
   
    DECLARE nuevo_id INT;
    SELECT IFNULL(MAX(IDUsuario), 0) + 1 INTO nuevo_id FROM usuario;
    SET nueva_matricula = CONCAT('USR', LPAD(nuevo_id, 5, '0'));
    UPDATE usuario
    SET matricula = nueva_matricula
    WHERE nombre_usuario = _nombre_usuario
    AND Correo = _Correo; 
END //

DELIMITER ;



SELECT 
    DATE(Creado) AS fecha,
    COUNT(*) AS cantidad_leads
FROM leads
GROUP BY fecha 