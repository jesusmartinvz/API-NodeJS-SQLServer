
const swaggerAutogen = require("swagger-autogen")({openapi: "3.0.0"});
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

const doc = {
    info: {
      title: 'Ecommerce API',
      description: 'Proyecto Ecommerce API',
    },
    servers: [
      {
        url: "https://nodes-api-mysql.herokuapp.com"
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
        }
      }
    },
    definitions: {
      myReferencedBillArray: [{ $ref: "#/definitions/Bill" }]
    }
  };
  
  swaggerAutogen(outputFile, endpointsFiles, doc);