DROP FUNCTION getMin;
DROP FUNCTION getMax;
DROP FUNCTION getAverage;
#SHOW FUNCTION STATUS WHERE Db = 'leadgraphs';

-- Set the delimiter for the function definition
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
        WHERE Creado >= startDate AND Creado <= endDate
        GROUP BY MONTH(Creado)
    ) AS registros_por_mes;

    RETURN promedio_result;
END //

-- Reset the delimiter to default
DELIMITER ;

-- Set the delimiter for the next function definition
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

-- Reset the delimiter to default
DELIMITER ;

-- Set the delimiter for the next function definition
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

-- Reset the delimiter to default
DELIMITER ;

-- Now, execute the function calls
SET @start_date = '2024-03-01';
SET @end_date = '2024-03-31';

SELECT getAverage(@start_date, @end_date) AS promedio_march;
SELECT getMax(@start_date, @end_date) AS Max_march;
SELECT getMin(@start_date, @end_date) AS Min_march;
