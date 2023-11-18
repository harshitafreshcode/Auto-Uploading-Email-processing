import { Request, Response } from "express";
require('dotenv').config();
import { AppDataSource } from "./config/db";
import routes from "./routes/routes";
import swaggerSpec1 from "./Swagger/swaggerConfig";
import bodyParser from "body-parser";
import { watchGmailInbox } from "./Controller/emailProcessingController";
const { PubSub } = require('@google-cloud/pubsub');
console.log(process.env.GOOGLE_CLOUD_PROJECT, 'll');
const fs = require('fs');
const data = fs.readFileSync('src/config/client.json', 'utf8');
; // Replace with the actual path
const pubsub = new PubSub({ projectId: 'login-with-goggle-398805' });

console.log(pubsub, 'pubsub');
const subscriptionName = 'projects/login-with-goggle-398805/subscriptions/email-process-sub'; // Replace with your subscription name

const subscription = pubsub.subscription(subscriptionName);
console.log(subscription, '///');
// Create an event handler to process incoming messages
export const messageHandler = (message: any) => {
    const data = JSON.parse(message.data.toString());
    console.log('Received a Gmail notification:', data);

    // Trigger your API here based on the notification content
    // test()
    message.ack(); // Acknowledge the message to remove it from the queue

};
console.log('Listening for Gmail notifications...');
const express = require('express');
const app = express();
const port = 3002;

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Middlewares
/* To handle invalid JSON data request */
app.use(bodyParser.json({ limit: '50mb' }));

/* For parsing urlencoded data */
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes) //main route

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec1));


AppDataSource.initialize().then(() => {
    console.log("Connected to Postgres Database")

    app.listen(port, async () => {
        await watchGmailInbox()
        await subscription.on('error', (error: any) => {
            console.error('Pub/Sub Error:', error);
        });
        console.log('*****');
        await subscription.on('message', messageHandler);
        console.log(`Server listening on port http://localhost:${port}`)
    })

}).catch((error) => {
    console.log('Database Connection Failed : ', error)
})
