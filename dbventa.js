var config = require('./dbconfig');//archivo config
const sql = require('mssql'); //Paquete MSSQL

//Funcion Asyncronica
async function getVenta(){
    try{
        let pool = await sql.connect(config);
        let ventas = await pool.request().query("SELECT * FROM cab_venta");
        console.log('Sql Server getVenta() connect...');
        return ventas.recordsets;
    }catch(error){
        console.log('error: ' + error);
    }
}

async function getVenta_x_factura(factura){
    try{
        let pool = await sql.connect(config);
        let ventas = await pool.request()
        .input('input_parameter', sql.VarChar, factura)
        .query("SELECT * FROM cab_venta Where NumFactura = @input_parameter");
        console.log('Sql Server getVenta_x_factura() connect...');
        return ventas.recordset;
    }catch(error){
        console.log('error: ' + error);
    }
}

module.exports = {
    getVenta : getVenta,
    getVenta_x_factura : getVenta_x_factura
}