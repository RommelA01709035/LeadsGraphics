const db = require('../util/database');

module.exports = class Grafica {

    constructor(x_, y_) {
        this.x = x_;
        this.y = y_
    }

    static getAverage(startMonth, endMonth){
        return db.execute(
          `
          SELECT getAverage(?, ?) as promedio;
          ` ,
          [startMonth, endMonth] 
        );
    }

    static getMax(startMonth, endMonth){
        return db.execute(
          `
          SELECT getMax(?, ?) as maximo;
          ` ,
          [startMonth, endMonth] 
        );
    }

    static getMin(startMonth, endMonth){
        return db.execute(
          `
          SELECT getMin(?, ?) as minimo;
          ` ,
          [startMonth, endMonth] 
        );
    }
    static getCount(startMonth, endMonth) {
        return db.execute(
            `
            SELECT COUNT(*) AS total_tuplas
            FROM leads
            WHERE Creado BETWEEN ? AND ?
            `,
            [startMonth, endMonth]
        );
    }
    
    static getLastMessage(palabra, startMonth, endMonth) {
        return db.execute(
            `
            SELECT COUNT(*) AS cantidad_mensajes
            FROM leads
            WHERE Ultimo_Mensaje LIKE CONCAT('%', ?, '%')
            AND Creado BETWEEN ? AND ?
            `,
            [palabra, startMonth, endMonth]
        );
    }
    
    static getPerCompany(startMonth, endMonth) {
        return db.execute(
            `
            SELECT COUNT(Compania) AS cantidad_leads, Compania
            FROM leads
            WHERE Creado BETWEEN ? AND ?
            GROUP BY Compania
            ORDER BY cantidad_leads DESC
            `,
            [startMonth, endMonth]
        );
    }
    
    static getLeadsMonth(startDate, endDate) {
        return db.execute(
            `SELECT MONTH(Creado) AS mes, COUNT(*) AS cantidad_leads, estado_lead
            FROM leads
            WHERE Creado BETWEEN ? AND ?
            GROUP BY mes, estado_lead
            ORDER BY mes`,
            [startDate, endDate]
        );
    }

    static getLeadsPerSeller(startMonth, endMonth){
        return db.execute(
            `
            SELECT COUNT(*) AS cantidad_leads, Seller_asignado, archivado
            FROM leads
            WHERE (Archivado = 'True' OR Archivado = 'False')
            AND Creado BETWEEN ? AND ?
            GROUP BY  Seller_asignado ,archivado
            
            `, [startMonth, endMonth]
        )
    }

    static getDropdownEmbudo(startMonth, endMonth) {
        return db.execute(
            `
            SELECT DISTINCT Embudo 
            FROM leads
            WHERE Creado BETWEEN ? AND ?
            `,
            [startMonth, endMonth]
        );
    }
    
    static getDropdownEtapa(startMonth, endMonth) {
        return db.execute(
            `
            SELECT DISTINCT etapa 
            FROM leads
            WHERE Creado BETWEEN ? AND ?
            `,
            [startMonth, endMonth]
        );
    }
    
    static getDropdownEstado(startMonth, endMonth) {
        return db.execute(
            `
            SELECT DISTINCT estado_lead 
            FROM leads
            WHERE Creado BETWEEN ? AND ?
            `,
            [startMonth, endMonth]
        );
    }

    static getDropdownEstadoValue(valor, startMonth, endMonth){
        return db.execute(
            `                    
            SELECT COUNT(*) AS cantidad_leads, Seller_asignado, estado_lead
            FROM leads
            where estado_lead = ?
            and Creado BETWEEN ? AND ?
            GROUP BY  Seller_asignado, estado_lead
            order by cantidad_leads desc;
        `, [valor, startMonth, endMonth])
    }

    static getDropdownEtapaValue(valor, startMonth, endMonth){
        return db.execute(
            `                    
            SELECT COUNT(*) AS cantidad_leads, Seller_asignado, etapa
            FROM leads
            where etapa = ?
            and Creado BETWEEN ? AND ?
            GROUP BY  Seller_asignado, etapa
            order by cantidad_leads desc;
        `, [valor, startMonth, endMonth])
        
    }

    static getDropdownEmbudoValue(valor,startMonth, endMonth){
        return db.execute(
            `                    
        SELECT COUNT(*) AS cantidad_leads, Seller_asignado, embudo
        FROM leads
        where embudo = ?
        and Creado BETWEEN ? AND ?
        GROUP BY  Seller_asignado, embudo
        order by cantidad_leads desc;
        `, [valor, startMonth, endMonth]

        )
        
    }

    static getLeadsArchivados(startMonth, endMonth){
        return db.execute(
            `
            SELECT COUNT(*) AS cantidad_leads, archivado 
            FROM leads
            WHERE (Archivado = 'True' OR Archivado = 'False')
            AND Creado BETWEEN ? AND ?
            GROUP BY Archivado
            `, [startMonth, endMonth]
        );
    }
}
