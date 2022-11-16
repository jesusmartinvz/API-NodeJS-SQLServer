const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');
const port = process.env.port || 3050;

const app = express()

app.use(bodyParser.json());

//Connection Details
const connection = mysql.createConnection({
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'b9c530f6dc11e9',
    password: 'c96485ab',
    database: 'heroku_81e7c3c7878e794'
});

//Route
app.get('/', (req, res) => {
    res.send('Bienvenido API-ECOMMERCE');
});


//ALL Boletas
app.get('/api', (req, res) => {
    const sql = 'SELECT * FROM cab_venta';
    
    connection.query(sql, (error, results) => {
        if(error) throw error;

        if(results.length > 0) {
            res.json(results);
        }else{
            res.send('No hay boletas disponibles');
        }
    });
});

//BOLETA FOR ID
app.get('/api/:factura', (req,res) =>{
    const {factura } = req.params
    const sql = `SELECT * FROM cab_venta Where NumFactura = ${factura}`;
        connection.query(sql, (error, result) => {
            if(error) throw error;

            if(result.length > 0) {
                res.json(result);
            }else{
                res.send('No existe la boleta');
            }
        });
});

app.post('/api/add', (req, res) =>{
    const sql = 'INSERT INTO cab_venta SET ?';
    const ventaObj = {
        NumFactura: req.body.NumFactura,
        Total_Fac: req.body.Total_Fac,
        Fecha_Fac: req.body.Fecha_Fac,
        IdUsuario: req.body.IdUsuario,
        id_estado: req.body.id_estado
    };
    connection.query(sql, ventaObj, error => {
        if(error) throw error;
        res.send('Venta Generada');
    });
});

app.put('/api/update/:id', (req, res) =>{
    const {id } = req.params;
    const {id_estado} = req.body;
    const sql = `UPDATE cab_venta set id_estado = '${id_estado}' WHERE Id_Venta = ${id}`;

    connection.query(sql, error => {
        if(error) throw error;
        res.send('Factura modificada');
    });
})

app.delete('/api/delete/:id', (req, res) =>{
    const {id } = req.params;
    const sql = `DELETE FROM cab_venta WHERE Id_Venta = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('FACTURA ELIMINADA');
    })

})

//Check Connection
connection.connect(error =>{
    if(error) throw error;
    console.log('Conexión exitosa')
})

app.listen(port, ()=> console.log(`Server running on port ${port}`));





/*

//View engine
app.set('view engine', 'ejs')






// Render Home Page
app.get('/', function(req, res){

    connection.query('SELECT * FROM cab_venta where Id_Venta = "11"', (error, rows) => {
        if(error) throw error;
        if(!error){
            console.log(rows)
            res.render('pages/index', {rows})
        }
    })
})

app.listen(port)
console.log(`Server is listening on port ${port}`);

*/