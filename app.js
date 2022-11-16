const express = require('express')
const app = express()

const mysql = require('mysql')

const port = process.env.port || 3000

//Connection DEtails
const connection = mysql.createConnection({
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'b9c530f6dc11e9',
    password: 'c96485ab',
    database: 'heroku_81e7c3c7878e794'
})


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