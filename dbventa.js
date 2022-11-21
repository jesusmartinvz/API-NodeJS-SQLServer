var config = require('./dbconfig');//archivo config
const sql = require('mssql'); //Paquete MSSQL

//Funcion Asyncronica
async function getVenta(){
    try{
        let pool = await sql.connect(config);
        let ventas = await pool.request().query("SELECT * FROM cab_venta");
        console.log('Sql Server conectado...');
        return ventas.recordsets;
    }catch(error){
        console.log('error: ' + error);
    }
}

module.exports = {
    getVenta : getVenta
}