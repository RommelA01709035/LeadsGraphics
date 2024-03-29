const db = require('../util/database');

module.exports = class Grafica {

    constructor(x_, y_) {
        this.x = x_;
        this.y = y_
    }

    static create() {
        return db.execute(
            `SELECT MONTH(Creado) AS mes, COUNT(*) AS cantidad_leads, estado_lead
            FROM leads
            WHERE MONTH(Creado) = 3
            GROUP BY mes, estado_lead
            ORDER BY mes;
            
            `
        );
    }
    
    static getData(x) {
        return db.execute(
            `SELECT MONTH(Creado) AS mes, COUNT(*) AS cantidad_leads, Estado_Lead AS x
            FROM leads
            WHERE MONTH(Creado) = ?
            GROUP BY mes, Estado_Lead
            ORDER BY cantidad_leads DESC;`, [x]
        );
    }
}