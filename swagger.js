
const swaggerAutogen = require("swagger-autogen")({openapi: "3.0.0"});
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/app.js"];

const doc = {
    info: {
      title: 'Ecommerce API',
      description: 'Proyecto Ecommerce API',
    },
    servers: [
      {
        url: "https://nodes-api-mysql.herokuapp.com/api"
      }
    ],
    components: {
      "@schemas": {
        Bill: {
          type: "object",
          properties: {
            Id_Venta: {
              type: "number",
              description: "Id de la venta",
              example: 1542
            },
            NumFactura: {
              type: "string",
              description: "Numero de la factura",
              example: "12345"
            },
            Total_Fac: {
              type: "number",
              description: "Costo total de la factura",
              example: 3000.50
            },
            Fecha_Fac: {
              type: "string",
              description: "Fecha de la factura",
              example: "15/11/2022"
            },
            IdUsuario: {
              type: "number",
              description: "id de usuario",
              example: 201
            },
            id_estado: {
              type: "string",
              description: "estado del pedido",
              example: "Enviado"
            }          
          },
          example: {
            Id_Venta: 1542,
            NumFactura: "12345",
            Total_Fac: 3000.50,
            Fecha_Fac: "15/11/2022",
            IdUsuario: 201,
            id_estado: "Enviado"
          }
        },

        Prod: {
          type: "object",
          properties: {
            IdProducto: {
              type: "number",
              description: "Id del producto",
              example: 15
            },
            CodProducto: {
              type: "string",
              description: "Codigo del producto",
              example: "12345"
            },
            Descripcion: {
              type: "string",
              description: "Nombre del producto",
              example: "Logitech G123 - Ultra"
            },
            Precio: {
              type: "number",
              description: "Precio del producto",
              example: 203.20
            },
            Stock: {
              type: "number",
              description: "Stock del producto",
              example: 223
            }      
          },
          example: {
            IdProducto: 15,
            CodProducto: "12345",
            Descripcion: "Nombre del producto",
            Precio: 203.20,
            Stock: 223
          }
        }
      }
    },
    definitions: {
      myReferencedBillArray: [{ $ref: "#/definitions/Bill" }],
      myReferencedProdArray: [{ $ref: "#/definitions/Prod" }]
    }
  };
  
  swaggerAutogen(outputFile, endpointsFiles, doc);