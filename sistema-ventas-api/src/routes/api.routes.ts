const swaggerJsDocs = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Sistema Ventas API",
            description: "Dcumentación API",
            contact: {
                name: "Jorge Luis Ayala Manrique",
                url: "https://github.com"
            },
            servers: [
                {
                    url:"http://localhost:3000",
                    description: "Developer Server"
                }
            ]
        }
    },
    basePath: "/",
    apis: ["./src/routes/*.ts"]
};

const swaggerDocs = swaggerJsDocs(options);
export default swaggerDocs;