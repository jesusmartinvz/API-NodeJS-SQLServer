//clase contacto
var Contacto = require('../contacto')
//venta
const dboventa = require('../dbventa')
//
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
    dboventa.getVenta().then(result =>{
      res.json(result[0]);
    })
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
router.get('/ecommerce/:factura', (req, res) => {
  dboventa.getVenta_x_factura(req.params.factura).then(result =>{
    res.json(result[0]);
  })
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


//PRODUCTOS
router.get('/productos/oferta', (req,res) =>{
  dboventa.getProducto().then(result =>{
    res.json(result[0]);
  })
      /* #swagger.responses[200] = {
        description: "Operacion exitosa",
        content: {
          "application/json": {
            schema: { 
              $ref: "#/definitions/Prod"
            }
          }
        }
    }
  */  
      
});


router.post('/contactos/add', (req, res) =>{
  let contacto = {...req.body}
  dboventa.insertarContacto(contacto).then(result =>{
    res.json(result[0]);
  })
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/definitions/Client"
            }
          }
        }
      }
     #swagger.responses[200] = {
        description: "Operacion exitosa",
        content: {
          "application/json": {
            schema: {
              $ref: "#/definitions/Client"
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