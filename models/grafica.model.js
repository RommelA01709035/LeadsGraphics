const db = require('../util/database');

module.exports = class Grafica {

    constructor(x_, y_) {
        this.x = x_;
        this.y = y_
    }


    static getLeadsMonthCategory(startMonth, endMonth) {
        return db.execute(
            `SELECT MONTH(Creado) AS mes, COUNT(*) AS cantidad_leads, estado_lead
            FROM leads
            WHERE MONTH(Creado) BETWEEN ? AND ?
            GROUP BY mes, estado_lead
            ORDER BY mes`,
            [startMonth, endMonth]
        );
    }
    
    static getLastMessage(palabra, startMonth, endMonth) {
        return db.execute(
            `SELECT COUNT(*) AS cantidad_mensajes
            FROM leads
            WHERE Ultimo_Mensaje LIKE CONCAT('%', ?, '%')
            AND MONTH(Creado) BETWEEN ? AND ?`,
            [palabra, startMonth, endMonth]
        );
    }
    
    static getPerCompany(startMonth, endMonth) {
        return db.execute(
            `SELECT COUNT(Compania ) AS cantidad_mensajes, Compania
            FROM leads
            WHERE MONTH(Creado) BETWEEN ? AND ?
            GROUP BY Compania
            ORDER BY cantidad_mensajes DESC`,
            [startMonth, endMonth]
        );
    }
    
    static getLeadsMonth(startMonth, endMonth) {
        return db.execute(
            `SELECT MONTH(Creado) AS mes, COUNT(*) AS cantidad_leads, estado_lead
            FROM leads
            WHERE MONTH(Creado) BETWEEN ? AND ?
            GROUP BY mes, estado_lead
            ORDER BY mes`,
            [startMonth, endMonth]
        );
    }

}