import { Request, Response } from "express";
require('dotenv').config();
import { AppDataSource } from "./config/db";
import routes from "./routes/routes";
import swaggerSpec1 from "./Swagger/swaggerConfig";
import bodyParser from "body-parser";
import { notifications, watchGmailInbox } from "./Controller/emailProcessingController";
const { google } = require('googleapis');
const { PubSub } = require('@google-cloud/pubsub');
const express = require('express');
const app = express();
const port = 3004;
const SCOPES = ['https://www.googleapis.com/auth/gmail'];
const PROJECT_ID = 'login-with-goggle-398805';
const TOPIC_NAME = 'projects/login-with-goggle-398805/topics/email-process-demo1';
const SUBSCRIPTION_NAME = 'projects/login-with-goggle-398805/subscriptions/MySub';
const fs = require('fs');
const credentials = JSON.parse(fs.readFileSync('src/config/client.json'));
const { OAuth2Client } = require('google-auth-library');
const { client_id, client_secret, redirect_uris } = credentials.web;
const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

const REFRESH_TOKEN = "1//04NSGwowVQIUJCgYIARAAGAQSNwF-L9IriO51tYS3QVxBW4X37QPKpbuoRl52MR4Y6l5UwA7-1pxOYqkIMhV0kNA_K6FtCl-0ZbQ"

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

app.use(bodyParser.json({ limit: '50mb' }));

/* For parsing urlencoded data */
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes) //main route
function handleRoutes() {
    console.log('2')
    notifications()
}

const pubsub: any = new PubSub({ keyFilename: 'src/config/client2.json' });
const subscriptionName = `${SUBSCRIPTION_NAME}`; // Replace with your subscription name

const subscription = pubsub.subscription(subscriptionName);

subscription.on('message', (message: any) => {
    // console.log(message, 'message');
    const data = JSON.parse(message.data.toString());

    // Handle the incoming message (notification) here, e.g., call your API.
    console.log('7')
    handleRoutes();

    // console.log('Received notification:', data);

    message.ack(); // Acknowledge the message to remove it from the queue
});


AppDataSource.initialize().then(() => {
    console.log("Connected to Postgres Database")

    app.listen(port, async () => {
        await watchGmailInbox()
        console.log(`Server listening on port http://localhost:${port}`)
    })

}).catch((error) => {
    console.log('Database Connection Failed : ', error)
})