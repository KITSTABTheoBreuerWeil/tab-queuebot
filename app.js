const express = require('express');
const bodyParser = require('body-parser')
const controllers = require('./controllers');

const app = express();

// configure middlewares
app.use(bodyParser.json())

// routes
app.get('/trigger', controllers.webhookController)
app.post('/webhook', controllers.webhookController);

module.exports = app;
