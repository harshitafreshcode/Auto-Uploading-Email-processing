import { Express, Request, Response } from "express";

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
    },
    // servers: [
    //     {

    //     }]
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    // security: [
    //     {
    //         bearerAuth: []
    //     }
    // ]

};

const options = {
    swaggerDefinition,
    apis: ['src/routes/routes.ts', 'src/routes/user.ts'],
};
const swaggerSpec1 = swaggerJSDoc(options);

export default swaggerSpec1