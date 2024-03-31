const db = require('../util/database');

module.exports = class Grafica {

    constructor(x_, y_) {
        this.x = x_;
        this.y = y_
    }


    static getLeadsMonthCategory() {
        return db.execute(
            `SELECT MONTH(Creado) AS mes, COUNT(*) AS cantidad_leads, estado_lead
            FROM leads
            GROUP BY mes, estado_lead
            ORDER BY mes;
            
            `
        );
    }
    
    static getLeadsMonth() {
        return db.execute(
            `SELECT MONTH(Creado) AS mes, COUNT(*) AS cantidad_leads
            FROM leads
            GROUP BY mes`
        );
    }

    static getLastMessage(palabra) {
        return db.execute(
            `SELECT COUNT(*) AS cantidad_mensajes
            FROM leads
            WHERE Ultimo_Mensaje LIKE CONCAT('%', ?, '%')`,
            [palabra]
        );
    }
    static getPerCompany() {
        return db.execute(
            `
            SELECT COUNT(Compania ) AS cantidad_mensajes, Compania
            FROM leads
            GROUP BY Compania
            ORDER BY cantidad_mensajes DESC
            `
        );
    }
}