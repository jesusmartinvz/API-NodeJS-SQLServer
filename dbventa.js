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
        console.log('error getVenta : ' + error);
    }
}

async function getVenta_x_factura(factura){
    try{
        let pool = await sql.connect(config);
        let ventas = await pool.request()
        .input('input_parameter', sql.VarChar, factura)
        .query("Select cv.Id_Venta, cv.NumFactura, cv.Total_Fac, CONVERT(VARCHAR, cv.Fecha_Fac, 103) AS Fecha_Fac, cv.IdUsuario, ep.des_estado from cab_venta cv Inner JOIN estado_pedido ep ON cv.id_estado = ep.id_estado Where NumFactura = @input_parameter");
        console.log('Sql Server getVenta_x_factura() connect...');
        return ventas.recordset;
    }catch(error){
        console.log('error getVenta_x_factura : ' + error);
    }
}

async function getProducto(){
    try{
        let pool = await sql.connect(config);
        let ventas = await pool.request().query("SELECT * FROM producto ORDER BY IdProducto DESC");
        console.log('Sql Server getProducot() connect...');
        return ventas.recordset;
    }catch(error){
        console.log('error getProducto : ' + error);
    }
}



async function insertarContacto(contacto){
    try{
        let pool = await sql.connect(config);
        let insertcontact = await pool.request()
        .input('nombre', sql.VarChar, contacto.nombre)
        .input('apellido', sql.VarChar, contacto.apellido)
        .input('correo', sql.VarChar, contacto.correo)
        .input('telefono', sql.VarChar, contacto.telefono)
        .input('descripcion', sql.VarChar, contacto.descripcion)
        .input('motivo', sql.VarChar, contacto.motivo)
        .execute("SP_CONTACTOS");
        console.log('Sql Server getVenta_x_factura() connect...');
        return insertcontact.recordsets;
    }catch(error){
        console.log('error insertarContacto: ' + error);
    }
}

//test
async function get3Productos(){
    try{
        let pool = await sql.connect(config);
        let ventas = await pool.request().query("SELECT TOP 3 * FROM producto ORDER BY IdProducto DESC");
        console.log('Sql Server get3Productos() connect...');
        return ventas.recordsets;
    }catch(error){
        console.log('error get3Productos : ' + error);
    }
}
//fin test

module.exports = {
    getVenta : getVenta,
    getVenta_x_factura : getVenta_x_factura,
    getProducto : getProducto,
    insertarContacto : insertarContacto,
    get3Productos : get3Productos
}