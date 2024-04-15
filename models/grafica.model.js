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

}