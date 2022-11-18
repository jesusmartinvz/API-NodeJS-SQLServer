const express = require('express');
const router = express.Router();

const mysql = require('mysql');

//mysql.createConnection
const connection = mysql.createPool({
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'b9c530f6dc11e9',
    password: 'c96485ab',
    database: 'heroku_81e7c3c7878e794'
});

//Route
router.get('/ecommerce', (req, res) => {
    const sql = 'SELECT * FROM cab_venta';
    
    connection.query(sql, (error, results) => {
        if(error) throw error;

        if(results.length > 0) {
            res.json(results);
        }else{
            res.send('No hay boletas disponibles');
        }
    });
    /* #swagger.responses[200] = {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: { 
                $ref: "#/definitions/myReferencedBillArray"                             
              }
            }
          }
      }
  */
});

//BOLETA FOR ID
router.get('/ecommerce/:factura', (req,res) =>{
    const {factura } = req.params
    const sql = `SELECT * FROM cab_venta Where NumFactura = ${factura}`;
      
        connection.query(sql, (error, result) => {
        
            if(error) throw error;

            if(result.length > 0) {
                res.json(result);
                res.status(200).send(result);

            }else{
                res.status(404).send('Boleta no encontrada');
                res.send('No existe la boleta');
            }
        });
        /* #swagger.responses[200] = {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: { 
                $ref: "#/definitions/Bill"
              }
            }
          }
      }
    */  
        
});


//createPOOL
connection.getConnection(function (err, connection) {
    //connecting to database
    if (err) {
        console.log("MYSQL CONNECT ERROR: " + err);
    } else {
        console.log("MYSQL CONNECTED SUCCESSFULLY.");
    }
});


module.exports = router;