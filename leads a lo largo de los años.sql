SELECT 
    YEAR(Creado) AS Anio,
    MONTH(Creado) AS Mes,
    COUNT(*) AS TotalLeads
FROM 
    leads
GROUP BY 
    YEAR(Creado),
    MONTH(Creado)
ORDER BY 
    Anio, Mes;
