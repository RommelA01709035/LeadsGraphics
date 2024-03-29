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
}