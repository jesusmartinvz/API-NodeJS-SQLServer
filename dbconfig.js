const config = {
    user: 'i201613182_SQLLogin_1',
    password: '5cejfwtra8',
    server: 'pcstore.mssql.somee.com',
    database: 'pcstore',
    options:{
        trustServerCertificate: true,
        trustedconnection: false,
        enableArithAbort: true,
        ecrypt: false
        //instancename :'/' en caso tenga alguna instancia
    }
}

module.exports = config;