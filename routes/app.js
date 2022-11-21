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

router.get('/ecommerce', (req, res) => {
    const sql = 'SELECT * FROM cab_venta';
    
    connection.query(sql, (error, results) => {
        if(error) throw error;

        if(results.length > 0) {
            res.json(results);
            console.log(results);
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

//PRODUCTOS
router.get('/productos/oferta', (req,res) =>{
  const {codigo } = req.params
  //const sql = `SELECT * FROM producto Where CodProducto = "${codigo}"`;
  const sql = 'SELECT * FROM producto ORDER BY IdProducto DESC LIMIT 1';
    
      connection.query(sql, (error, result) => {
      
          if(error) throw error;

          if(result.length > 0) {
              const jsonVarP = 
                            {IdProducto: result[0].IdProducto, 
                            CodProducto: result[0].CodProducto, 
                            Descripcion: result[0].Descripcion, 
                            Precio: result[0].Precio, 
                            Stock: result[0].Stock};
              res.send(jsonVarP);

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
              $ref: "#/definitions/Prod"
            }
          }
        }
    }
  */  
      
});

//ALL PRODUCTOS
router.get('/productos', (req, res) => {
  const sql = 'SELECT * FROM producto ORDER BY IdProducto DESC LIMIT 5';
  
  connection.query(sql, (error, results) => {
      if(error) throw error;

      if(results.length > 0) {
          res.json(results);
          console.log(results);
      }else{
          res.send('No hay boletas disponibles');
      }
  });
  /* #swagger.responses[200] = {
        description: "Operacion exitosa",
        content: {
          "application/json": {
            schema: { 
              $ref: "#/definitions/myReferencedProdArray"                             
            }
          }
        }
    }
*/
});

router.post('/contactos/add', (req, res) =>{
  const sql = 'INSERT INTO contactos SET ?';
  const ventaObj = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      correo: req.body.correo,
      telefono: req.body.telefono,
      descripcion: req.body.descripcion,
      motivo: req.body.motivo
  };
  connection.query(sql, ventaObj, error => {
      if(error) throw error;
      res.send('Cliente agregado');
  });
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